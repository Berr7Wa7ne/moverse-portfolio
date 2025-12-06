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
  supabase: SupabaseClientInstance,
  originalFilename?: string,
  originalMimeType?: string
): Promise<{
  url: string | null;
  fileSize?: number;
  mimeType?: string;
  fileName?: string;
}> {
  const token = process.env[TOKEN_ENV_KEY];
  if (!token) {
    console.error('[webhook] Missing WHATSAPP_TOKEN for media download');
    return { url: null };
  }

  try {
    // 1) Get media metadata
    const metadataResp = await fetch(`${WHATSAPP_API_BASE}/${mediaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!metadataResp.ok) {
      console.error('[webhook] Failed to fetch media metadata:', metadataResp.status);
      return { url: null };
    }

    const metadata = (await metadataResp.json()) as {
      url?: string;
      mime_type?: string;
      file_size?: number;
    };

    if (!metadata.url) {
      console.error('[webhook] No URL in media metadata');
      return { url: null };
    }

    // 2) Download binary
    const mediaResp = await fetch(metadata.url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!mediaResp.ok) {
      console.error('[webhook] Failed to download media binary:', mediaResp.status);
      return { url: null };
    }

    const blob = await mediaResp.blob();
    const fileSize = blob.size;
    const detectedMimeType = metadata.mime_type || originalMimeType;

    // 3) Build filename with original name if available
    const extension = detectedMimeType?.split('/')[1] || getExtensionFromType(mediaType);
    const timestamp = Date.now();
    
    let filename: string;
    let storedFileName: string | undefined;
    
    if (originalFilename) {
      // Sanitize the original filename
      const sanitized = originalFilename.replace(/[^a-zA-Z0-9_.-]/g, '_');
      filename = `whatsapp/${mediaType}/${timestamp}-${sanitized}`;
      storedFileName = originalFilename;
    } else {
      filename = `whatsapp/${mediaType}/${timestamp}-${mediaId}.${extension}`;
      storedFileName = `${mediaId}.${extension}`;
    }

    // 4) Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('whatsapp-media')
      .upload(filename, blob, {
        contentType: detectedMimeType,
        cacheControl: '31536000',
        upsert: false,
      });

    if (uploadError) {
      if (uploadError.message?.includes?.('already exists')) {
        const { data: publicUrlData } = supabase.storage
          .from('whatsapp-media')
          .getPublicUrl(filename);
        console.log('[webhook] File already exists, returning URL:', publicUrlData.publicUrl);
        return { 
          url: publicUrlData.publicUrl,
          fileSize,
          mimeType: detectedMimeType,
          fileName: storedFileName
        };
      }
      console.error('[webhook] Upload error:', uploadError);
      return { url: null };
    }

    const { data: publicUrlData } = supabase.storage
      .from('whatsapp-media')
      .getPublicUrl(filename);

    console.log('[webhook] Media uploaded successfully:', publicUrlData.publicUrl);
    return { 
      url: publicUrlData.publicUrl, 
      fileSize,
      mimeType: detectedMimeType,
      fileName: storedFileName
    };
  } catch (err) {
    console.error('[webhook] Error in downloadAndStoreMedia:', err);
    return { url: null };
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
    fileName: extracted.fileName,
    fileSize: extracted.fileSize,
    mimeType: extracted.mimeType,
  });
}


/* ============================================================
   extractIncomingMessage - ENHANCED WITH PROPER FILENAME
   ============================================================ */
async function extractIncomingMessage(message: any, supabase: SupabaseClientInstance) {
  const type = message.type;

  console.log('[webhook][extract] Processing message type:', type);
  
  // 🔍 CRITICAL DEBUG - Log the ENTIRE message object
  console.log('[webhook][extract] FULL MESSAGE OBJECT:');
  console.log(JSON.stringify(message, null, 2));

  // TEXT
  if (type === 'text' && message.text?.body) {
    return { 
      type: 'text', 
      text: message.text.body, 
      mediaUrl: null, 
      caption: null 
    };
  }

  // Interactive replies
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

  // Media types - ENHANCED DEBUG
  const mediaTypes = ['image', 'video', 'audio', 'document'] as const;
  if (mediaTypes.includes(type as any)) {
    const media = message[type] ?? {};
    const caption = media?.caption ?? null;
    
    // 🔍 CRITICAL DEBUG - Log the ENTIRE media object
    console.log('[webhook][extract] FULL MEDIA OBJECT:');
    console.log(JSON.stringify(media, null, 2));
    
    // Try EVERY possible filename field
    const possibleFilenames = {
      'media.filename': media?.filename,
      'media.file_name': media?.file_name,
      'media.fileName': media?.fileName,
      'message.document.filename': message.document?.filename,
      'message.video.filename': message.video?.filename,
      'message.audio.filename': message.audio?.filename,
      'message.image.filename': message.image?.filename,
    };
    
    console.log('[webhook][extract] ALL POSSIBLE FILENAME FIELDS:');
    console.log(JSON.stringify(possibleFilenames, null, 2));
    
    // Use the first non-null filename we find
    const originalFileName = 
      media?.filename || 
      media?.file_name || 
      media?.fileName ||
      message[type]?.filename ||
      null;
    
    const originalMimeType = media?.mime_type || media?.mimeType || null;

    console.log('[webhook][extract] SELECTED FILENAME:', originalFileName);
    console.log('[webhook][extract] Media message:', { 
      type, 
      hasId: !!media?.id, 
      hasLink: !!media?.link,
      caption,
      fileName: originalFileName,
      mimeType: originalMimeType
    });

    // If the payload includes a direct link
    if (media?.link) {
      console.log('[webhook][extract] Using direct link:', media.link);
      return { 
        type, 
        text: null, 
        mediaUrl: media.link, 
        caption,
        fileName: originalFileName,
        mimeType: originalMimeType
      };
    }

    // If only an id is provided, download and store
    if (media?.id) {
      console.log('[webhook][extract] Downloading media with id:', media.id);
      console.log('[webhook][extract] Will use filename:', originalFileName);
      
      const result = await downloadAndStoreMedia(
        media.id, 
        type, 
        supabase,
        originalFileName,
        originalMimeType
      );
      
      if (result.url) {
        console.log('[webhook][extract] Media stored successfully:', result.url);
        console.log('[webhook][extract] Result filename:', result.fileName);
        
        return { 
          type, 
          text: null, 
          mediaUrl: result.url, 
          caption,
          fileName: originalFileName || result.fileName,
          fileSize: result.fileSize,
          mimeType: result.mimeType || originalMimeType
        };
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

    // No media info
    console.warn('[webhook][extract] No media id or link found');
    return { 
      type, 
      text: `[${type} message - no media info]`, 
      mediaUrl: null, 
      caption 
    };
  }

  // Location
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

  // Contacts
  if (type === 'contacts' && message.contacts && message.contacts.length) {
    const contactText = JSON.stringify(message.contacts);
    return { 
      type: 'contact', 
      text: contactText, 
      mediaUrl: null, 
      caption: null 
    };
  }

  // Default fallback
  console.warn('[webhook][extract] Unknown message type:', type);
  return { 
    type: type ?? 'unknown', 
    text: `[${type || 'unknown'} message received]`, 
    mediaUrl: null, 
    caption: null 
  };
}