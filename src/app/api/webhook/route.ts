import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSupabaseClient } from '@/lib/supabaseClient';
import {
  ensureContact,
  ensureConversation,
  insertMessage,
  type SupabaseClientInstance,
} from '@/lib/whatsapp/storage';

/* config */
const WHATSAPP_API_BASE = 'https://graph.facebook.com/v20.0';
const TOKEN_ENV_KEY = 'WHATSAPP_TOKEN';
const VERIFY_TOKEN_ENV_KEY = 'WHATSAPP_VERIFY_TOKEN';

/* types are omitted here for brevity — keep your types if you want */

function getExtensionFromType(mediaType: string): string {
  const extensions: Record<string, string> = {
    image: 'jpg',
    video: 'mp4',
    audio: 'mp3',
    document: 'pdf',
  };
  return extensions[mediaType] || 'bin';
}

/* download media from WhatsApp media endpoint and store into Supabase storage */
async function downloadAndStoreMedia(
  mediaId: string,
  mediaType: string,
  supabase: SupabaseClientInstance
): Promise<string | null> {
  const token = process.env[TOKEN_ENV_KEY];
  if (!token) {
    console.error('[webhook] Missing WHATSAPP_TOKEN for media download');
    return null;
  }

  try {
    // 1) Get media metadata (contains temporary url)
    const metadataResp = await fetch(`${WHATSAPP_API_BASE}/${mediaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!metadataResp.ok) {
      console.error('[webhook] Failed to fetch media metadata:', metadataResp.status);
      return null;
    }

    const metadata = (await metadataResp.json()) as {
      url?: string;
      mime_type?: string;
      file_size?: number;
    };

    if (!metadata.url) {
      console.error('[webhook] No URL in media metadata');
      return null;
    }

    // 2) Download binary
    const mediaResp = await fetch(metadata.url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!mediaResp.ok) {
      console.error('[webhook] Failed to download media binary:', mediaResp.status);
      return null;
    }

    const blob = await mediaResp.blob();

    // 3) Build filename and upload to Supabase storage
    const extension = metadata.mime_type?.split('/')[1] || getExtensionFromType(mediaType);
    const timestamp = Date.now();
    const filename = `whatsapp/${mediaType}/${timestamp}-${mediaId}.${extension}`;

    const { error: uploadError, data } = await supabase.storage
      .from('whatsapp-media')
      .upload(filename, blob, {
        contentType: metadata.mime_type,
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      // if file exists, return public url
      if (uploadError.message?.includes?.('already exists')) {
        const { data: publicUrlData } = await supabase.storage
          .from('whatsapp-media')
          .getPublicUrl(filename);
        return publicUrlData.publicUrl;
      } else {
        console.error('[webhook] Upload error:', uploadError);
        return null;
      }
    }

    const { data: publicUrlData } = supabase.storage
      .from('whatsapp-media')
      .getPublicUrl(filename);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('[webhook] Error in downloadAndStoreMedia:', err);
    return null;
  }
}

/* ============================================================
   Webhook GET (verification)
   ============================================================ */
export async function GET(request: NextRequest) {
  const verifyToken = process.env[VERIFY_TOKEN_ENV_KEY];
  if (!verifyToken) {
    console.error('[webhook][GET] VERIFY token is not configured');
    return NextResponse.json({ error: 'Verification token not configured.' }, { status: 500 });
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
   Webhook POST (inbound messages)
   ============================================================ */
export async function POST(request: NextRequest) {
  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const entries = payload?.entry ?? [];
  if (!entries.length) return NextResponse.json({ success: true }, { status: 200 });

  const supabase = createSupabaseClient();

  try {
    for (const entry of entries) {
      await handleEntry(entry, supabase);
    }
  } catch (err) {
    console.error('[webhook][POST] Processing error:', err);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

/* ============================================================
   handleEntry: iterate changes/messages
   ============================================================ */
async function handleEntry(entry: any, supabase: SupabaseClientInstance) {
  for (const change of entry.changes || []) {
    if (change.field !== 'messages') continue;
    const { value } = change;
    const messages = value?.messages ?? [];
    const contacts = value?.contacts ?? [];

    for (const msg of messages) {
      try {
        const contact =
          contacts.find((c: any) => c.wa_id === msg.from) ?? contacts[0];

        const contactId = await ensureContact(supabase, {
          waId: msg.from,
          profileName: contact?.profile?.name ?? null,
          profilePictureUrl: null,
        });

        const conversationId = await ensureConversation(supabase, { contactId });

        await insertInboundMessage(supabase, conversationId, msg, value);
      } catch (err) {
        console.error('[webhook] message processing error for', msg?.id, err);
      }
    }
  }
}

/* ============================================================
   insertInboundMessage
   - uses extractIncomingMessage to return structured object:
     { type, text, mediaUrl, caption }
   - then calls insertMessage(...) with fields separated
   ============================================================ */
async function insertInboundMessage(
  supabase: SupabaseClientInstance,
  conversationId: string,
  message: any,
  value: any
) {
  const extracted = await extractIncomingMessage(message, supabase);

  const fromNumber = message.from;
  const toNumber = value?.metadata?.display_phone_number?.replace('+', '') ?? '';

  // Map to your insertMessage payload — keep existing keys but add media_url + caption
  await insertMessage(supabase, {
    conversationId,
    direction: 'incoming',
    // keep legacy 'body' if your storage expects it — set to text only (or caption fallback)
    message: extracted.text ?? extracted.caption ?? extracted.mediaUrl ?? '',
    waMessageId: message.id,
    messageType: extracted.type ?? message.type ?? null,
    // new structured fields
    text: extracted.text ?? null,
    media_url: extracted.mediaUrl ?? null,
    caption: extracted.caption ?? null,
    sentAt: new Date(Number(message.timestamp) * 1000).toISOString(),
    rawPayload: message,
    fromNumber,
    toNumber,
  });
}

/* ============================================================
   extractIncomingMessage
   - reads WhatsApp payload and returns a clean object:
     { type, text, mediaUrl, caption }
   - downloads inbound media and stores it in Supabase storage
   ============================================================ */
async function extractIncomingMessage(message: any, supabase: SupabaseClientInstance) {
  const type = message.type;

  // TEXT
  if (type === 'text' && message.text?.message) {
    return { type: 'text', text: message.text.message, mediaUrl: null, caption: null };
  }

  // interactive replies
  if (message.interactive?.button_reply?.title) {
    return { type: 'interactive', text: message.interactive.button_reply.title, mediaUrl: null, caption: null };
  }
  if (message.interactive?.list_reply?.title) {
    const lr = message.interactive.list_reply;
    const text = lr.description ? `${lr.title} - ${lr.description}` : lr.title;
    return { type: 'interactive', text, mediaUrl: null, caption: null };
  }

  // media types
  const mediaTypes = ['image', 'video', 'audio', 'document'] as const;
  if (mediaTypes.includes(type)) {
    const media = message[type] ?? {};
    const caption = media?.caption ?? null;

    // If the payload includes a direct link (outbound or some cases)
    if (media?.link) {
      return { type, text: null, mediaUrl: media.link, caption };
    }

    // If only an id is provided (inbound), download and store
    if (media?.id) {
      const storedUrl = await downloadAndStoreMedia(media.id, type, supabase);
      if (storedUrl) {
        return { type, text: null, mediaUrl: storedUrl, caption };
      } else {
        // fallback to caption if download failed
        return { type, text: null, mediaUrl: null, caption: caption ?? `[${type} message - media unavailable]` };
      }
    }

    // no media info
    return { type, text: null, mediaUrl: null, caption: caption ?? `[${type} message]` };
  }

  // other types (location, contact, status) — store as textual fallback
  if (type === 'location' && message.location) {
    const lat = message.location.latitude, lon = message.location.longitude;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    return { type: 'location', text: null, mediaUrl: mapUrl, caption: message.location.name ?? null };
  }

  if (type === 'contacts' && message.contacts && message.contacts.length) {
    const contactText = JSON.stringify(message.contacts);
    return { type: 'contact', text: contactText, mediaUrl: null, caption: null };
  }

  // default fallback
  return { type: type ?? 'unknown', text: `[${type} message received]`, mediaUrl: null, caption: null };
}
