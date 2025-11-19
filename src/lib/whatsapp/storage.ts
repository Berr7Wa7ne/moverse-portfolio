import { createSupabaseClient } from '@/lib/supabaseClient';

export type SupabaseClientInstance = ReturnType<typeof createSupabaseClient>;

export type ContactRow = {
  id: string;
  wa_id: string;
  phone_number: string;
  profile_name?: string | null;
  profile_picture_url?: string | null;
  created_at?: string;
};

export type ConversationRow = {
  id: string;
  contact_id: string;
  channel?: string | null;
  status?: string | null;
  last_message_at?: string | null;
  created_at?: string;
};

export type MessageRow = {
  id: string;
  conversation_id: string;
  direction: 'incoming' | 'outgoing';
  body: string;
  wa_message_id: string;
  message_type?: string | null;
  sent_at: string;
  raw_payload: unknown;
};

export const WHATSAPP_CHANNEL = 'whatsapp';

export async function ensureContact(
  supabaseClient: SupabaseClientInstance,
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

  const { data: existingContact, error: fetchError } = await supabaseClient
    .from('contacts')
    .select('id, profile_picture_url')
    .eq('wa_id', waId)
    .maybeSingle();

  if (fetchError) {
    console.error('[whatsapp][contacts] Failed to fetch contact.', fetchError);
    throw fetchError;
  }

  const existingContactRow = existingContact as
    | Pick<ContactRow, 'id' | 'profile_picture_url'>
    | null;

  if (existingContactRow?.id) {
    if (profilePictureUrl && !existingContactRow.profile_picture_url) {
      const { error: updateError } = await supabaseClient
        .from('contacts')
        .update({ profile_picture_url: profilePictureUrl })
        .eq('id', existingContactRow.id);

      if (updateError) {
        console.error(
          '[whatsapp][contacts] Failed to update contact picture.',
          updateError,
        );
      }
    }

    return existingContactRow.id;
  }

  const { data: insertedContact, error: insertError } = await supabaseClient
    .from('contacts')
    .insert({
      wa_id: waId,
      phone_number: phoneNumber,
      profile_name: profileName,
      profile_picture_url: profilePictureUrl ?? null,
    })
    .select('id')
    .maybeSingle();

  const insertedContactRow = insertedContact as Pick<ContactRow, 'id'> | null;

  if (insertError || !insertedContactRow?.id) {
    console.error('[whatsapp][contacts] Failed to insert contact.', insertError);
    throw insertError ?? new Error('Unable to insert contact.');
  }

  return insertedContactRow.id;
}

export async function ensureConversation(
  supabaseClient: SupabaseClientInstance,
  {
    contactId,
  }: {
    contactId: string;
  },
): Promise<string> {
  const { data: existingConversation, error: fetchError } = await supabaseClient
    .from('conversations')
    .select('id')
    .eq('contact_id', contactId)
    .eq('channel', WHATSAPP_CHANNEL)
    .maybeSingle();

  if (fetchError) {
    console.error('[whatsapp][conversations] Failed to fetch conversation.', fetchError);
    throw fetchError;
  }

  const existingConversationRow = existingConversation as Pick<ConversationRow, 'id'> | null;

  if (existingConversationRow?.id) {
    return existingConversationRow.id;
  }

  const { data: insertedConversation, error: insertError } = await supabaseClient
    .from('conversations')
    .insert({
      contact_id: contactId,
      channel: WHATSAPP_CHANNEL,
      status: 'open',
      last_message_at: new Date().toISOString(),
    })
    .select('id')
    .maybeSingle();

  const insertedConversationRow = insertedConversation as Pick<ConversationRow, 'id'> | null;

  if (insertError || !insertedConversationRow?.id) {
    console.error('[whatsapp][conversations] Failed to insert conversation.', insertError);
    throw insertError ?? new Error('Unable to insert conversation.');
  }

  return insertedConversationRow.id;
}

export async function logConversationActivity(
  supabaseClient: SupabaseClientInstance,
  conversationId: string,
) {
  const { error: updateConversationError } = await supabaseClient
    .from('conversations')
    .update({
      last_message_at: new Date().toISOString(),
    })
    .eq('id', conversationId);

  if (updateConversationError) {
    console.error(
      '[whatsapp][conversations] Failed to update conversation timestamp.',
      updateConversationError,
    );
    throw updateConversationError;
  }
}

export async function insertMessage(
  supabaseClient: SupabaseClientInstance,
  {
    conversationId,
    direction,
    body,
    waMessageId,
    messageType,
    sentAt,
    rawPayload,
    fromNumber,
    toNumber,
  }: {
    conversationId: string;
    direction: 'incoming' | 'outgoing';
    body: string;
    waMessageId: string;
    messageType: string | null;
    sentAt: string;
    rawPayload: unknown;
    fromNumber: string;
    toNumber: string;
  },
) {
  const { error: insertError } = await supabaseClient
    .from('messages')
    .insert({
      conversation_id: conversationId,
      direction,
      from_number: fromNumber,
      to_number: toNumber,
      message: body,
      wa_message_id: waMessageId,
      message_type: messageType,
      sent_at: sentAt,
      raw_payload: rawPayload,
    });

  if (insertError) {
    console.error('[whatsapp][messages] Failed to insert message.', insertError);
    throw insertError;
  }

  await logConversationActivity(supabaseClient, conversationId);
}

export function normalizePhoneNumber(waId: string): string {
  return waId.replace(/\D/g, '');
}


