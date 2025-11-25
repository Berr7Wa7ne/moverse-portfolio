import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSupabaseClient } from '@/lib/supabaseClient';
import {
  ensureContact,
  ensureConversation,
  insertMessage,
  type SupabaseClientInstance,
} from '@/lib/whatsapp/storage';

type WhatsAppEntry = {
  id: string;
  changes: Array<{
    field: string;
    value: WhatsAppChangeValue;
  }>;
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

type WhatsAppContact = {
  profile?: {
    name?: string;
  };
  wa_id: string;
};

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
  image?: {
    caption?: string;
    id?: string;
    mime_type?: string;
    link?: string;
  };
  video?: {
    caption?: string;
    id?: string;
    mime_type?: string;
    link?: string;
  };
  audio?: {
    id?: string;
    mime_type?: string;
    link?: string;
  };
  document?: {
    caption?: string;
    filename?: string;
    mime_type?: string;
    link?: string;
  };
  [key: string]: unknown;
};

type WhatsAppStatus = {
  id: string;
  status: string;
  timestamp: string;
  recipient_id: string;
  [key: string]: unknown;
};

const VERIFY_TOKEN_ENV_KEY = 'WHATSAPP_VERIFY_TOKEN';

export async function GET(request: NextRequest) {
  const verifyToken = process.env[VERIFY_TOKEN_ENV_KEY];

  if (!verifyToken) {
    console.error(`[webhook][GET] Missing ${VERIFY_TOKEN_ENV_KEY} environment variable.`);
    return NextResponse.json(
      { error: 'Verification token is not configured.' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('[webhook][GET] Verification attempt', { mode, token, challenge });

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return new Response(challenge, { status: 200 });
  }

  console.warn('[webhook][GET] Verification failed', { mode, token });
  return NextResponse.json({ error: 'Verification failed.' }, { status: 403 });
}

export async function POST(request: NextRequest) {
  let payload: { entry?: WhatsAppEntry[] };

  try {
    payload = (await request.json()) as { entry?: WhatsAppEntry[] };
  } catch (error) {
    console.error('[webhook][POST] Invalid JSON payload.', error);
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  console.log('[webhook][POST] Incoming payload', JSON.stringify(payload, null, 2));

  if (!payload?.entry?.length) {
    console.warn('[webhook][POST] No entry data present in payload.');
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const supabase = createSupabaseClient();

  try {
    console.log('[webhook][POST] Processing entries', { count: payload.entry.length });
    for (const entry of payload.entry) {
      await handleEntry(entry, supabase);
    }
  } catch (error) {
    console.error('[webhook][POST] Failed to persist data to Supabase.', error);
    return NextResponse.json({ error: 'Failed to process webhook event.' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

async function handleEntry(entry: WhatsAppEntry, supabaseClient: SupabaseClientInstance) {
  for (const change of entry.changes) {
    if (change.field !== 'messages') {
      console.log('[webhook] Change skipped (unsupported field)', change.field);
      continue;
    }

    const { value } = change;
    const { messages = [], contacts = [] } = value;

    if (!messages.length) {
      console.log('[webhook] Change contained no messages.');
      continue;
    }

    console.log('[webhook] Processing messages', { count: messages.length });

    for (const message of messages) {
      try {
        const contact = contacts.find(({ wa_id }) => wa_id === message.from) ?? contacts[0];

        const contactId = await ensureContact(supabaseClient, {
          waId: message.from,
          profileName: contact?.profile?.name ?? null,
          profilePictureUrl: null,
        });
        console.log('[webhook] ensureContact OK', { wa_id: message.from, contactId });

        const conversationId = await ensureConversation(supabaseClient, {
          contactId,
        });
        console.log('[webhook] ensureConversation OK', { conversationId, contactId });

        await insertInboundMessage(supabaseClient, conversationId, message, value);
        console.log('[webhook] insertMessage OK', {
          conversationId,
          waMessageId: message.id,
          type: message.type,
          timestamp: message.timestamp,
        });
      } catch (err) {
        console.error('[webhook] Error processing single message', {
          from: message.from,
          id: message.id,
          type: message.type,
        }, err);
      }
    }
  }
}

async function insertInboundMessage(
  supabaseClient: SupabaseClientInstance,
  conversationId: string,
  message: WhatsAppMessage,
  value: WhatsAppChangeValue,
) {
  const body = extractMessageBody(message);
  const fromNumber = message.from;
  const toNumber =
  value?.metadata?.display_phone_number?.replace('+', '') ||
  process.env.WHATSAPP_TEST_NUMBER?.replace('+', '') ||
  '';


await insertMessage(supabaseClient, {
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

function extractMessageBody(message: WhatsAppMessage): string {
  // Handle text messages
  if (message.text?.body) {
    return message.text.body;
  }

  // Handle button replies
  if (message.interactive?.button_reply?.title) {
    return message.interactive.button_reply.title;
  }

  // Handle list replies
  if (message.interactive?.list_reply?.title) {
    return `${message.interactive.list_reply.title}${
      message.interactive.list_reply.description
        ? ` - ${message.interactive.list_reply.description}`
        : ''
    }`;
  }

  // Handle media messages (image, video, audio, document)
  const mediaTypes = ['image', 'video', 'audio', 'document'] as const;
  
  for (const mediaType of mediaTypes) {
    const media = message[mediaType];
    if (!media) continue;

    const mediaUrl = media.link;
    const caption = 'caption' in media ? media.caption : undefined;

    if (caption && mediaUrl) {
      return `${caption}\n${mediaUrl}`;
    }
    if (mediaUrl) {
      return mediaUrl;
    }
    if (caption) {
      return caption;
    }
  }

  // Fallback for unsupported message types
  return `[${message.type} message received]`;
}

