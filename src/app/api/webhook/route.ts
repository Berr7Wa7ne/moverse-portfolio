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
  const body = extractMessageBody(message);

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
   FIXED extractMessageBody — TYPE-SAFE MEDIA HANDLING
============================================================ */
function extractMessageBody(message: WhatsAppMessage): string {
  console.log('[webhook] Extracting body for:', message.type);

  // TEXT
  if (message.type === 'text' && message.text?.body) {
    return message.text.body;
  }

  // BUTTON REPLY
  if (message.interactive?.button_reply?.title) {
    return message.interactive.button_reply.title;
  }

  // LIST REPLY
  if (message.interactive?.list_reply?.title) {
    const lr = message.interactive.list_reply;
    return lr.description ? `${lr.title} - ${lr.description}` : lr.title;
  }

  // MEDIA TYPES
  const mediaTypes = ['image', 'video', 'audio', 'document'] as const;
  type MediaType = (typeof mediaTypes)[number];

  const getMedia = (t: MediaType) => message[t] ?? null;

  for (const type of mediaTypes) {
    if (message.type === type) {
      const media = getMedia(type);
      if (!media) continue;

      const mediaId = media.id;
      const mediaUrl = media.link;
      const caption = (media as WhatsAppMediaWithCaption).caption ?? '';

      if (mediaUrl) return caption ? `${caption}\n${mediaUrl}` : mediaUrl;

      if (mediaId) {
        const url = `https://lookaside.fbsbx.com/whatsapp_business/${mediaId}`;
        return caption ? `${caption}\n${url}` : url;
      }

      if (caption) return caption;
    }
  }

  return `[${message.type} message received]`;
}
