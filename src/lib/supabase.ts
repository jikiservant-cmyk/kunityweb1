import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL and Anon Key must be provided in environment variables.');
    }
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}
