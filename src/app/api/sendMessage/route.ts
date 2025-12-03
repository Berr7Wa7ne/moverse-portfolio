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

type SendMessageRequest = {
  to: string;
  message: string;
  previewUrl?: boolean;
};

const WHATSAPP_API_BASE = 'https://graph.facebook.com/v20.0';
const TOKEN_ENV_KEY = 'WHATSAPP_TOKEN';
const PHONE_ID_ENV_KEY = 'WHATSAPP_PHONE_NUMBER_ID';

/* ============================
   CORS CONFIG (ENV + FALLBACK)
   ============================ */
const ALLOWED_ORIGIN =
  process.env.CORS_ORIGIN || "http://localhost:3000";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

/* =======================
   CORS PRE-FLIGHT HANDLER
   ======================= */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

/* ================
   POST HANDLER
   ================ */
export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();

  let body: SendMessageRequest;

  try {
    body = (await request.json()) as SendMessageRequest;
  } catch (error) {
    console.error('[sendMessage][POST] Invalid JSON payload.', error);
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400, headers: corsHeaders() }
    );
  }

  const validationError = validatePayload(body);
  if (validationError) {
    return NextResponse.json(
      { error: validationError },
      { status: 400, headers: corsHeaders() }
    );
  }

  const token = process.env[TOKEN_ENV_KEY];
  const phoneNumberId = process.env[PHONE_ID_ENV_KEY];

  if (!token || !phoneNumberId) {
    console.error(`[sendMessage][POST] Missing ${TOKEN_ENV_KEY} or ${PHONE_ID_ENV_KEY}.`);
    return NextResponse.json(
      { error: 'WhatsApp API credentials are not configured.' },
      { status: 500, headers: corsHeaders() }
    );
  }

  const recipient = normalizePhoneNumber(body.to);
  const payload = buildMessagePayload(recipient, body.message, body.previewUrl);

  console.log('[sendMessage][POST] Outgoing payload', payload);

  const response = await fetch(`${WHATSAPP_API_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json() as WhatsAppSendResponse;

  if (!response.ok) {
    console.error('[sendMessage][POST] WhatsApp API error.', { status: response.status, result });
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message.', details: result },
      { status: response.status, headers: corsHeaders() }
    );
  }

  try {
    await persistOutboundMessage({
      supabaseClient: supabase,
      recipientWaId: recipient,
      content: body.message,
      responsePayload: result,
    });
  } catch (error) {
    console.error('[sendMessage][POST] Failed to persist outbound message.', error);
  }

  return NextResponse.json(
    {
      success: true,
      messageId: extractMessageId(result),
    },
    { status: 200, headers: corsHeaders() }
  );
}

/* =============================
   HELPERS (UNCHANGED)
   ============================= */

type WhatsAppSendResponse = {
  messaging_product?: string;
  contacts?: Array<{ input: string; wa_id: string }>;
  messages?: Array<{ id: string }>;
  error?: unknown;
  [key: string]: unknown;
};

function validatePayload(body: SendMessageRequest): string | null {
  if (!body?.to) return 'Recipient phone number (to) is required.';
  if (!body?.message) return 'Message content is required.';
  if (body.message.length > 4096)
    return 'Message content exceeds the 4096 character limit.';
  return null;
}

function buildMessagePayload(recipient: string, message: string, previewUrl?: boolean) {
  return {
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'text',
    text: {
      body: message,
      preview_url: previewUrl ?? false,
    },
  };
}

function extractMessageId(response: WhatsAppSendResponse): string {
  return response.messages?.[0]?.id ?? crypto.randomUUID();
}

async function persistOutboundMessage({
  supabaseClient,
  recipientWaId,
  content,
  responsePayload,
}: {
  supabaseClient: SupabaseClientInstance;
  recipientWaId: string;
  content: string;
  responsePayload: WhatsAppSendResponse;
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
    console.error('[sendMessage][persist] Missing WHATSAPP_TEST_NUMBER in environment variables.');
  }

  await insertMessage(supabaseClient, {
    conversationId,
    direction: 'outgoing',
    message: content,
    waMessageId: extractMessageId(responsePayload),
    messageType: 'text',
    sentAt: new Date().toISOString(),
    rawPayload: responsePayload,
    fromNumber,
    toNumber,
  });
}
