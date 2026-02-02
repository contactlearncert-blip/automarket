import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// supabase will be null if the environment variables are not set.
export const supabase: SupabaseClient<Database> | null = 
  (supabaseUrl && supabaseAnonKey && supabaseUrl !== "YOUR_SUPABASE_URL") 
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
