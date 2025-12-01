import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSupabaseClient } from '@/lib/supabaseClient';
import {
  ensureContact,
  ensureConversation,
  insertMessage,
  type SupabaseClientInstance,
} from '@/lib/whatsapp/storage';

/* ============================================================
   WHATSAPP API CONFIG
============================================================ */
const WHATSAPP_API_BASE = 'https://graph.facebook.com/v20.0';
const TOKEN_ENV_KEY = 'WHATSAPP_TOKEN';

/* ============================================================
   STRICT — WhatsApp MEDIA TYPES (FIXED)
============================================================ */

type WhatsAppMediaBase = {
  id?: string;
  mime_type?: string;
  link?: string;
};

type WhatsAppMediaWithCaption = WhatsAppMediaBase & {
  caption?: string;
};

type WhatsAppDocument = WhatsAppMediaWithCaption & {
  filename?: string;
};

/* ============================================================
   FIXED — WhatsAppMessage TYPE
============================================================ */
type WhatsAppMessage = {
  from: string;
  id: string;
  timestamp: string;
  type: string;

  text?: {
    body: string;
  };

  interactive?: {
    type: string;
    list_reply?: {
      id: string;
      title: string;
      description?: string;
    };
    button_reply?: {
      id: string;
      title: string;
    };
  };

  image?: WhatsAppMediaWithCaption;
  video?: WhatsAppMediaWithCaption;
  audio?: WhatsAppMediaBase;
  document?: WhatsAppDocument;

  [key: string]: unknown;
};

type WhatsAppContact = {
  profile?: {
    name?: string;
  };
  wa_id: string;
};

type WhatsAppStatus = {
  id: string;
  status: string;
  timestamp: string;
  recipient_id: string;
  [key: string]: unknown;
};

type WhatsAppChangeValue = {
  messaging_product: 'whatsapp';
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: WhatsAppContact[];
  messages?: WhatsAppMessage[];
  statuses?: WhatsAppStatus[];
};

type WhatsAppEntry = {
  id: string;
  changes: Array<{
    field: string;
    value: WhatsAppChangeValue;
  }>;
};

const VERIFY_TOKEN_ENV_KEY = 'WHATSAPP_VERIFY_TOKEN';

/* ============================================================
   HELPER: FETCH ACTUAL MEDIA URL FROM WHATSAPP
============================================================ */
async function getMediaUrl(mediaId: string): Promise<string | null> {
  const token = process.env[TOKEN_ENV_KEY];
  
  if (!token) {
    console.error('[webhook] Missing WHATSAPP_TOKEN for media fetch');
    return null;
  }

  try {
    // Step 1: Get media metadata
    const response = await fetch(`${WHATSAPP_API_BASE}/${mediaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('[webhook] Failed to fetch media metadata:', response.status);
      return null;
    }

    const data = await response.json() as { url?: string };
    
    // Step 2: Return the actual downloadable URL
    return data.url || null;
  } catch (error) {
    console.error('[webhook] Error fetching media URL:', error);
    return null;
  }
}

/* ============================================================
   GET — VERIFY WEBHOOK
============================================================ */
export async function GET(request: NextRequest) {
  console.log('[webhook] Webhook called with method:', request.method);
  const verifyToken = process.env[VERIFY_TOKEN_ENV_KEY];

  if (!verifyToken) {
    console.error(`[webhook][GET] Missing ${VERIFY_TOKEN_ENV_KEY}`);
    return NextResponse.json(
      { error: 'Verification token not configured.' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed.' }, { status: 403 });
}

/* ============================================================
   POST — PROCESS INBOUND MESSAGES
============================================================ */
export async function POST(request: NextRequest) {
  let payload: { entry?: WhatsAppEntry[] };

  try {
    payload = (await request.json()) as { entry?: WhatsAppEntry[] };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!payload?.entry?.length) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const supabase = createSupabaseClient();

  try {
    for (const entry of payload.entry) {
      await handleEntry(entry, supabase);
    }
  } catch (err) {
    console.error('[webhook][POST] Error processing entries:', err);
    return NextResponse.json({ error: 'Processing failed.' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

/* ============================================================
   HANDLE ENTRY
============================================================ */
async function handleEntry(entry: WhatsAppEntry, supabase: SupabaseClientInstance) {
  for (const change of entry.changes) {
    if (change.field !== 'messages') continue;

    const { value } = change;
    const { messages = [], contacts = [] } = value;

    for (const message of messages) {
      try {
        const contact =
          contacts.find((c) => c.wa_id === message.from) ?? contacts[0];

        const contactId = await ensureContact(supabase, {
          waId: message.from,
          profileName: contact?.profile?.name ?? null,
          profilePictureUrl: null,
        });

        const conversationId = await ensureConversation(supabase, { contactId });

        await insertInboundMessage(supabase, conversationId, message, value);
      } catch (err) {
        console.error('[webhook] Error processing message:', message.id, err);
      }
    }
  }
}

/* ============================================================
   INSERT INBOUND MESSAGE
============================================================ */
async function insertInboundMessage(
  supabase: SupabaseClientInstance,
  conversationId: string,
  message: WhatsAppMessage,
  value: WhatsAppChangeValue,
) {
  const body = await extractMessageBody(message);

  const fromNumber = message.from;
  const toNumber =
    value.metadata?.display_phone_number?.replace('+', '') ?? '';

  await insertMessage(supabase, {
    conversationId,
    direction: 'incoming',
    body,
    waMessageId: message.id,
    messageType: message.type ?? null,
    sentAt: new Date(Number(message.timestamp) * 1000).toISOString(),
    rawPayload: message,
    fromNumber,
    toNumber,
  });
}

/* ============================================================
   FIXED extractMessageBody — FETCHES ACTUAL MEDIA URL
============================================================ */
async function extractMessageBody(message: WhatsAppMessage): Promise<string> {
  console.log('[webhook] Extracting body for type:', message.type);
  console.log('[webhook] Full message payload:', JSON.stringify(message, null, 2));

  // TEXT
  if (message.type === 'text' && message.text?.body) {
    console.log('[webhook] Processing text message:', message.text.body);
    return message.text.body;
  }

  // BUTTON REPLY
  if (message.interactive?.button_reply?.title) {
    console.log('[webhook] Processing button reply:', message.interactive.button_reply.title);
    return message.interactive.button_reply.title;
  }

  // LIST REPLY
  if (message.interactive?.list_reply?.title) {
    const lr = message.interactive.list_reply;
    const response = lr.description ? `${lr.title} - ${lr.description}` : lr.title;
    console.log('[webhook] Processing list reply:', response);
    return response;
  }

  // MEDIA TYPES
  const mediaTypes = ['image', 'video', 'audio', 'document'] as const;
  type MediaType = (typeof mediaTypes)[number];

  if (mediaTypes.includes(message.type as MediaType)) {
    const mediaType = message.type as MediaType;
    console.log(`[webhook] Processing ${mediaType} message`);
    
    const media = message[mediaType];
    if (!media) {
      console.log(`[webhook] No media found for type: ${mediaType}`);
      return `[${mediaType} message - no media data]`;
    }

    console.log(`[webhook] Media data:`, JSON.stringify(media, null, 2));
    
    const caption = (media as WhatsAppMediaWithCaption).caption || '';
    let mediaUrl: string | null = null;

    // Try to get URL from direct link first (for outbound messages)
    if (media.link) {
      mediaUrl = media.link;
      console.log('[webhook] Using direct link:', mediaUrl);
    } 
    // Otherwise fetch from media ID (for inbound messages)
    else if (media.id) {
      console.log('[webhook] Fetching media URL for ID:', media.id);
      mediaUrl = await getMediaUrl(media.id);
      console.log('[webhook] Retrieved media URL:', mediaUrl);
    }

    if (mediaUrl) {
      const response = caption ? `${caption}\n${mediaUrl}` : mediaUrl;
      console.log(`[webhook] Returning media with ${caption ? 'caption' : 'no caption'}:`, response);
      return response;
    }

    if (caption) {
      console.log(`[webhook] No media URL available, returning caption only:`, caption);
      return caption;
    }

    console.log(`[webhook] No usable media data found for ${mediaType}`);
    return `[${mediaType} message - no usable data]`;
  }

  console.log(`[webhook] Unhandled message type: ${message.type}`);
  return `[${message.type} message received]`;
}