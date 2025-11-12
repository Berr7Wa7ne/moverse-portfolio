import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Shared Supabase client factory used by API routes.
 * The client is intentionally recreated per request to avoid sharing
 * auth context between concurrent invocations.
 */
export const createSupabaseClient = (): SupabaseClient => {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error('Missing Supabase URL environment variable.');
  }

  // Prefer service role on the server to bypass RLS for webhooks and system writes.
  const key = serviceRoleKey || anonKey;

  if (!key) {
    throw new Error('Missing Supabase key (service role or anon).');
  }

  // eslint-disable-next-line no-console
  console.log('[supabaseClient] Creating client', {
    usingServiceRole: Boolean(serviceRoleKey),
  });

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
};



