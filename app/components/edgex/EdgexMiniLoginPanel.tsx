import { useState } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { isSupabaseConfigured } from "@/services/supabase/client"
import { useSupabaseAuth } from "@/services/supabase/useSupabaseAuth"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

import { EdgexPrimaryButton } from "./EdgexPrimitives"

export interface EdgexMiniLoginPanelProps {
  title?: string
  subtitle?: string
  onSignedIn?: () => void
  onCreateAccount?: () => void
}

/**
 * A compact sign-in card — a smaller footprint than the full Login screen,
 * meant to sit inline on a page (the landing page hero, or as the prompt
 * inside EdgexAuthGate) rather than be navigated to separately.
 */
export function EdgexMiniLoginPanel({
  title = "Already have an account?",
  subtitle = "Sign in to pick up where you left off.",
  onSignedIn,
  onCreateAccount,
}: EdgexMiniLoginPanelProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { signIn, isAuthenticated, session, signOut } = useSupabaseAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async () => {
    setError("")
    setSubmitting(true)
    try {
      await signIn(email, password)
      onSignedIn?.()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't sign in — check your details and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (isAuthenticated) {
    return (
      <View
        style={{
          backgroundColor: edgex.surface,
          borderWidth: 1,
          borderColor: edgex.hairline,
          borderRadius: 12,
          padding: spacing.md,
        }}
      >
        <Text
          text={`Signed in as ${session?.user?.email ?? "your account"}`}
          style={{ color: edgex.text, fontSize: 14, marginBottom: spacing.sm }}
        />
        <EdgexPrimaryButton
          text="Sign out"
          onPress={signOut}
          fontFamily={typography.primary.medium}
          style={{ backgroundColor: "transparent", borderWidth: 1, borderColor: edgex.steel, color: edgex.text }}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        backgroundColor: edgex.surface,
        borderWidth: 1,
        borderColor: edgex.hairline,
        borderRadius: 12,
        padding: spacing.md,
        maxWidth: 340,
      }}
    >
      <Text
        text={title}
        style={{ fontFamily: typography.primary.medium, color: edgex.text, fontSize: 15, marginBottom: 4 }}
      />
      <Text text={subtitle} style={{ color: edgex.textDim, fontSize: 12.5, marginBottom: spacing.sm }} />

      {!isSupabaseConfigured ? (
        <Text
          text="Supabase isn't configured in this build yet — sign-in will work once it is."
          style={{ color: edgex.amber, fontSize: 11.5, lineHeight: 16, marginBottom: spacing.sm }}
        />
      ) : null}

      <TextField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={{ marginBottom: spacing.xs }}
        style={{ color: edgex.text, fontSize: 13 }}
        inputWrapperStyle={{ backgroundColor: edgex.surfaceRaised, borderColor: edgex.hairline, minHeight: 40 }}
        placeholderTextColor={edgex.textDim}
      />
      <TextField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={{ marginBottom: spacing.sm }}
        style={{ color: edgex.text, fontSize: 13 }}
        inputWrapperStyle={{ backgroundColor: edgex.surfaceRaised, borderColor: edgex.hairline, minHeight: 40 }}
        placeholderTextColor={edgex.textDim}
      />

      {error ? <Text text={error} style={{ color: edgex.danger, fontSize: 11.5, marginBottom: spacing.xs }} /> : null}

      <EdgexPrimaryButton
        text={submitting ? "Signing in…" : "Sign in"}
        onPress={onSubmit}
        fontFamily={typography.primary.medium}
        disabled={submitting}
        style={{ alignSelf: "stretch", textAlign: "center" }}
      />

      {onCreateAccount ? (
        <Text
          text="New here? Create an account →"
          onPress={onCreateAccount}
          style={{ color: edgex.textDim, fontSize: 12, marginTop: spacing.sm }}
        />
      ) : null}
    </View>
  )
}
