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

    const { error: uploadError } = await supabase.storage
      .from('whatsapp-media')
      .upload(filename, blob, {
        contentType: metadata.mime_type,
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      // if file exists, return public url
      if (uploadError.message?.includes?.('already exists')) {
        const { data: publicUrlData } = supabase.storage
          .from('whatsapp-media')
          .getPublicUrl(filename);
        console.log('[webhook] File already exists, returning URL:', publicUrlData.publicUrl);
        return publicUrlData.publicUrl;
      } else {
        console.error('[webhook] Upload error:', uploadError);
        return null;
      }
    }

    const { data: publicUrlData } = supabase.storage
      .from('whatsapp-media')
      .getPublicUrl(filename);

    console.log('[webhook] Media uploaded successfully:', publicUrlData.publicUrl);
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
   insertInboundMessage - FIXED
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

  console.log('[webhook] Extracted message:', extracted);

  // 🟢 FIX: Use correct parameter names
  await insertMessage(supabase, {
    conversationId,
    direction: 'incoming',
    text: extracted.text,
    caption: extracted.caption,
    mediaUrl: extracted.mediaUrl,
    messageType: extracted.type ?? 'text',
    waMessageId: message.id,
    sentAt: new Date(Number(message.timestamp) * 1000).toISOString(),
    rawPayload: message,
    fromNumber,
    toNumber,
  });
}

/* ============================================================
   extractIncomingMessage - FIXED & ENHANCED
   ============================================================ */
async function extractIncomingMessage(message: any, supabase: SupabaseClientInstance) {
  const type = message.type;

  console.log('[webhook][extract] Processing message type:', type);

  // TEXT - FIXED: Use message.text.body instead of message.text.message
  if (type === 'text' && message.text?.body) {
    return { 
      type: 'text', 
      text: message.text.body, 
      mediaUrl: null, 
      caption: null 
    };
  }

  // interactive replies
  if (message.interactive?.button_reply?.title) {
    return { 
      type: 'interactive', 
      text: message.interactive.button_reply.title, 
      mediaUrl: null, 
      caption: null 
    };
  }
  if (message.interactive?.list_reply?.title) {
    const lr = message.interactive.list_reply;
    const text = lr.description ? `${lr.title} - ${lr.description}` : lr.title;
    return { 
      type: 'interactive', 
      text, 
      mediaUrl: null, 
      caption: null 
    };
  }

  // media types
  const mediaTypes = ['image', 'video', 'audio', 'document'] as const;
  if (mediaTypes.includes(type as any)) {
    const media = message[type] ?? {};
    const caption = media?.caption ?? null;

    console.log('[webhook][extract] Media message:', { 
      type, 
      hasId: !!media?.id, 
      hasLink: !!media?.link,
      caption 
    });

    // If the payload includes a direct link (outbound or some cases)
    if (media?.link) {
      console.log('[webhook][extract] Using direct link:', media.link);
      return { type, text: null, mediaUrl: media.link, caption };
    }

    // If only an id is provided (inbound), download and store
    if (media?.id) {
      console.log('[webhook][extract] Downloading media with id:', media.id);
      const storedUrl = await downloadAndStoreMedia(media.id, type, supabase);
      if (storedUrl) {
        console.log('[webhook][extract] Media stored successfully:', storedUrl);
        return { type, text: null, mediaUrl: storedUrl, caption };
      } else {
        console.error('[webhook][extract] Media download failed for id:', media.id);
        return { 
          type, 
          text: `[${type} message - media download failed]`, 
          mediaUrl: null, 
          caption 
        };
      }
    }

    // no media info
    console.warn('[webhook][extract] No media id or link found');
    return { 
      type, 
      text: `[${type} message - no media info]`, 
      mediaUrl: null, 
      caption 
    };
  }

  // location
  if (type === 'location' && message.location) {
    const lat = message.location.latitude;
    const lon = message.location.longitude;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    return { 
      type: 'location', 
      text: null, 
      mediaUrl: mapUrl, 
      caption: message.location.name ?? null 
    };
  }

  // contacts
  if (type === 'contacts' && message.contacts && message.contacts.length) {
    const contactText = JSON.stringify(message.contacts);
    return { 
      type: 'contact', 
      text: contactText, 
      mediaUrl: null, 
      caption: null 
    };
  }

  // default fallback
  console.warn('[webhook][extract] Unknown message type:', type);
  return { 
    type: type ?? 'unknown', 
    text: `[${type || 'unknown'} message received]`, 
    mediaUrl: null, 
    caption: null 
  };
}