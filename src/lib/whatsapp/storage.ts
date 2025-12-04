import { createSupabaseClient } from '@/lib/supabaseClient';

export type SupabaseClientInstance = ReturnType<typeof createSupabaseClient>;

export const WHATSAPP_CHANNEL = 'whatsapp';

// ----------------------------
// CONTACT
// ----------------------------
export async function ensureContact(
  supabase: SupabaseClientInstance,
  {
    waId,
    profileName,
    profilePictureUrl,
  }: {
    waId: string;
    profileName: string | null;
    profilePictureUrl?: string | null;
  },
): Promise<string> {
  const phoneNumber = normalizePhoneNumber(waId);

  const { data: contact, error: fetchError } = await supabase
    .from('contacts')
    .select('id, profile_picture_url')
    .eq('wa_id', waId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  if (contact?.id) {
    if (profilePictureUrl && !contact.profile_picture_url) {
      await supabase
        .from('contacts')
        .update({ profile_picture_url: profilePictureUrl })
        .eq('id', contact.id);
    }
    return contact.id;
  }

  const { data: inserted, error: insertError } = await supabase
    .from('contacts')
    .insert({
      wa_id: waId,
      phone_number: phoneNumber,
      profile_name: profileName,
      profile_picture_url: profilePictureUrl ?? null,
    })
    .select('id')
    .maybeSingle();

  if (insertError || !inserted?.id) throw insertError ?? new Error('Failed to insert contact');

  return inserted.id;
}

// ----------------------------
// CONVERSATION
// ----------------------------
export async function ensureConversation(
  supabase: SupabaseClientInstance,
  { contactId }: { contactId: string },
): Promise<string> {
  const { data: convo, error: fetchErr } = await supabase
    .from('conversations')
    .select('id')
    .eq('contact_id', contactId)
    .eq('channel', WHATSAPP_CHANNEL)
    .maybeSingle();

  if (fetchErr) throw fetchErr;

  if (convo?.id) return convo.id;

  const { data: inserted, error: insertErr } = await supabase
    .from('conversations')
    .insert({
      contact_id: contactId,
      channel: WHATSAPP_CHANNEL,
      status: 'open',
      last_message_at: new Date().toISOString(),
    })
    .select('id')
    .maybeSingle();

  if (insertErr || !inserted?.id)
    throw insertErr ?? new Error('Failed to create conversation');

  return inserted.id;
}

// ----------------------------
// UPDATE TIMESTAMP + LAST MESSAGE
// ----------------------------
export async function logConversationActivity(
  supabase: SupabaseClientInstance,
  conversationId: string,
  messageText: string | null,
  messageType: string | null,
  caption: string | null,
) {
  await supabase
    .from('conversations')
    .update({
      last_message_at: new Date().toISOString(),
      last_message: messageText ?? caption ?? '',
      last_message_type: messageType ?? 'text',
      last_message_caption: caption ?? null,
    })
    .eq('id', conversationId);
}

// ----------------------------
// INSERT MESSAGE — FIXED
// ----------------------------
export async function insertMessage(
  supabase: SupabaseClientInstance,
  {
    conversationId,
    direction,
    text,
    caption,
    mediaUrl,
    messageType,
    waMessageId,
    sentAt,
    rawPayload,
    fromNumber,
    toNumber,
  }: {
    conversationId: string;
    direction: 'incoming' | 'outgoing';
    text: string | null;
    caption: string | null;
    mediaUrl: string | null;
    messageType: string | null;
    waMessageId: string;
    sentAt: string;
    rawPayload: unknown;
    fromNumber: string;
    toNumber: string;
  },
) {
  // 🟢 Determine what goes in the 'message' column
  // For media: store the mediaUrl
  // For text: store the text
  // Fallback: empty string
  const messageContent = mediaUrl ?? text ?? caption ?? '';

  const { error: insertErr } = await supabase.from('messages').insert({
    conversation_id: conversationId,
    direction,
    from_number: fromNumber,
    to_number: toNumber,
    message: messageContent,           // 🟢 Main content (URL for media, text for text)
    caption: caption,                  // 🟢 Caption for media messages
    media_url: mediaUrl,               // 🟢 Media URL (if applicable)
    wa_message_id: waMessageId,
    message_type: messageType ?? 'text',
    sent_at: sentAt,
    raw_payload: rawPayload,
  });

  if (insertErr) {
    console.error('[whatsapp][messages] insert error:', insertErr);
    throw insertErr;
  }

  // 🟢 Update conversation with message details
  await logConversationActivity(
    supabase,
    conversationId,
    messageContent,
    messageType,
    caption,
  );
}

// ----------------------------
export function normalizePhoneNumber(waId: string): string {
  return waId.replace(/\D/g, '');
}