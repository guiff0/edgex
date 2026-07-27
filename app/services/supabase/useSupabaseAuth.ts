import { useCallback, useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"

import { isSupabaseConfigured, supabase } from "./client"

export interface UseSupabaseAuthResult {
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
}

export function useSupabaseAuth(): UseSupabaseAuthResult {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase isn't configured yet — add your project URL and anon key to .env")
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase isn't configured yet — add your project URL and anon key to .env")
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: fullName ? { data: { full_name: fullName } } : undefined,
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
  }, [])

  return { session, loading, isAuthenticated: !!session, signIn, signUp, signOut }
}
