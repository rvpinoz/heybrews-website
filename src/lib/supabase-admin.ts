import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const EVENTS_BUCKET = 'event-images';
export const GALLERY_BUCKET = 'gallery-images';
export const MEMBERS_BUCKET = 'member-images';

let client: SupabaseClient | null = null;

// Lazily instantiated so the app/build doesn't crash before Storage env vars are set.
// Server-only, uses the service role key — bypasses RLS for admin uploads.
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum di-set di .env');
    }
    client = createClient(url, key);
  }
  return client;
}
