// sendMediaMessage/route.ts - FIXED VERSION

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createSupabaseClient } from '@/lib/supabaseClient';
import {
  ensureContact,
  ensureConversation,
  insertMessage,
  normalizePhoneNumber,
  type SupabaseClientInstance,
} from '@/lib/whatsapp/storage';

const WHATSAPP_API_BASE = 'https://graph.facebook.com/v20.0';
const TOKEN_ENV_KEY = 'WHATSAPP_TOKEN';
const PHONE_ID_ENV_KEY = 'WHATSAPP_PHONE_NUMBER_ID';

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// 🟢 ENHANCED: Added fileName, fileSize, mimeType
type SendMediaMessageRequest = {
  to: string;
  type: 'image' | 'video' | 'audio' | 'document';
  mediaUrl: string;
  caption?: string;
  fileName?: string;      // 🟢 NEW
  fileSize?: number;      // 🟢 NEW
  mimeType?: string;      // 🟢 NEW
};

type WhatsAppSendResponse = {
  messaging_product?: string;
  contacts?: Array<{ input: string; wa_id: string }>;
  messages?: Array<{ id: string }>;
  error?: unknown;
  [key: string]: unknown;
};

function validateMediaPayload(body: SendMediaMessageRequest): string | null {
  if (!body?.to) return 'Recipient phone number (to) is required.';
  if (!body?.type) return 'Media type is required.';
  if (!body?.mediaUrl) return 'mediaUrl is required.';
  if (!['image', 'video', 'audio', 'document'].includes(body.type)) {
    return 'Invalid media type. Must be image, video, audio, or document.';
  }
  return null;
}

function buildMediaPayload(body: SendMediaMessageRequest & { recipient: string }) {
  const { recipient, type, mediaUrl, caption, fileName } = body;

  const base: Record<string, unknown> = {
    messaging_product: 'whatsapp',
    to: recipient,
    type,
  };

  if (type === 'image') {
    return {
      ...base,
      image: {
        link: mediaUrl,
        ...(caption ? { caption } : {}),
      },
    };
  }

  if (type === 'video') {
    return {
      ...base,
      video: {
        link: mediaUrl,
        ...(caption ? { caption } : {}),
      },
    };
  }

  if (type === 'audio') {
    return {
      ...base,
      audio: {
        link: mediaUrl,
      },
    };
  }

  if (type === 'document') {
    return {
      ...base,
      document: {
        link: mediaUrl,
        ...(caption ? { caption } : {}),
        // 🟢 IMPORTANT: WhatsApp supports filename in document messages
        ...(fileName ? { filename: fileName } : {}),
      },
    };
  }

  return base;
}

function extractMessageId(response: WhatsAppSendResponse): string {
  return response.messages?.[0]?.id ?? crypto.randomUUID();
}

// 🟢 ENHANCED: Added fileName, fileSize, mimeType parameters
async function persistOutboundMediaMessage({
  supabaseClient,
  recipientWaId,
  mediaUrl,
  caption,
  responsePayload,
  messageType,
  fileName,
  fileSize,
  mimeType,
}: {
  supabaseClient: SupabaseClientInstance;
  recipientWaId: string;
  mediaUrl: string;
  caption: string | null;
  responsePayload: WhatsAppSendResponse;
  messageType: string;
  fileName?: string | null;    // 🟢 NEW
  fileSize?: number | null;    // 🟢 NEW
  mimeType?: string | null;    // 🟢 NEW
}) {
  const contactId = await ensureContact(supabaseClient, {
    waId: recipientWaId,
    profileName: null,
  });

  const conversationId = await ensureConversation(supabaseClient, {
    contactId,
  });

  const fromNumber = process.env.WHATSAPP_TEST_NUMBER?.replace('+', '') ?? '';
  const toNumber = recipientWaId;

  if (!fromNumber) {
    console.error('[sendMediaMessage][persist] Missing WHATSAPP_TEST_NUMBER in environment variables.');
  }

  // 🟢 ENHANCED: Now includes fileName, fileSize, mimeType
  await insertMessage(supabaseClient, {
    conversationId,
    direction: 'outgoing',
    text: null,
    caption: caption,
    mediaUrl: mediaUrl,
    messageType,
    waMessageId: extractMessageId(responsePayload),
    sentAt: new Date().toISOString(),
    rawPayload: responsePayload,
    fromNumber,
    toNumber,
    fileName: fileName || null,      // 🟢 NEW
    fileSize: fileSize || null,      // 🟢 NEW
    mimeType: mimeType || null,      // 🟢 NEW
  });
}

export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();

  let body: SendMediaMessageRequest;

  try {
    body = (await request.json()) as SendMediaMessageRequest;
  } catch (error) {
    console.error('[sendMediaMessage][POST] Invalid JSON payload.', error);
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400, headers: corsHeaders() },
    );
  }

  const validationError = validateMediaPayload(body);
  if (validationError) {
    return NextResponse.json(
      { error: validationError },
      { status: 400, headers: corsHeaders() },
    );
  }

  const token = process.env[TOKEN_ENV_KEY];
  const phoneNumberId = process.env[PHONE_ID_ENV_KEY];

  if (!token || !phoneNumberId) {
    console.error(`[sendMediaMessage][POST] Missing ${TOKEN_ENV_KEY} or ${PHONE_ID_ENV_KEY}.`);
    return NextResponse.json(
      { error: 'WhatsApp API credentials are not configured.' },
      { status: 500, headers: corsHeaders() },
    );
  }

  const recipient = normalizePhoneNumber(body.to);
  const payload = buildMediaPayload({ ...body, recipient });

  console.log('[sendMediaMessage][POST] Outgoing payload', payload);

  const response = await fetch(`${WHATSAPP_API_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as WhatsAppSendResponse;

  if (!response.ok) {
    console.error('[sendMediaMessage][POST] WhatsApp API error.', { status: response.status, result });
    return NextResponse.json(
      { error: 'Failed to send WhatsApp media message.', details: result },
      { status: response.status, headers: corsHeaders() },
    );
  }

  try {
    // 🟢 ENHANCED: Now passes fileName, fileSize, mimeType to persistence
    await persistOutboundMediaMessage({
      supabaseClient: supabase,
      recipientWaId: recipient,
      mediaUrl: body.mediaUrl,
      caption: body.caption ?? null,
      responsePayload: result,
      messageType: body.type,
      fileName: body.fileName || null,     // 🟢 NEW
      fileSize: body.fileSize || null,     // 🟢 NEW
      mimeType: body.mimeType || null,     // 🟢 NEW
    });
  } catch (error) {
    console.error('[sendMediaMessage][POST] Failed to persist outbound media message.', error);
  }

  return NextResponse.json(
    {
      success: true,
      messageId: extractMessageId(result),
    },
    { status: 200, headers: corsHeaders() },
  );
}