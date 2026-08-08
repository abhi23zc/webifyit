import { createClient } from "@supabase/supabase-js";

// We require these to be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// We export a single supabase instance to be used across the application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
