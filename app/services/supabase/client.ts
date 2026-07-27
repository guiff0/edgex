import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ""

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured && __DEV__) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Supabase] EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY are not set.\n" +
      "Copy .env.example to .env and fill them in from your Supabase project settings.",
  )
}

// Falls back to harmless placeholder values so createClient doesn't throw when
// unconfigured — isSupabaseConfigured is what screens should actually check.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)

export const RESUME_BUCKET = "resumes"
