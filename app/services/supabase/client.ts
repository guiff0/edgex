import { Platform } from "react-native"
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
      // Web needs this on: after a user clicks the email-confirmation link,
      // Supabase redirects back with the session in the URL, and this is
      // what actually picks it up. It was hardcoded false before, which
      // meant confirmed accounts never got signed in on web — the account
      // *was* created, but nothing ever showed the user as signed in, which
      // is exactly what "sign-up doesn't work" looks like from the outside.
      // Native has no URL to detect a session from (no `window`), so it
      // stays false there.
      detectSessionInUrl: Platform.OS === "web",
    },
  },
)

export const RESUME_BUCKET = "resumes"
