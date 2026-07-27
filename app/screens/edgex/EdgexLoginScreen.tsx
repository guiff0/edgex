import { FC, useState } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { EdgexPrimaryButton } from "@/components/edgex/EdgexPrimitives"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { isSupabaseConfigured } from "@/services/supabase/client"
import { useSupabaseAuth } from "@/services/supabase/useSupabaseAuth"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexLoginScreenProps extends EdgexStackScreenProps<"EdgexLogin"> {}

export const EdgexLoginScreen: FC<EdgexLoginScreenProps> = function EdgexLoginScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { signIn, isAuthenticated, signOut } = useSupabaseAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async () => {
    setError("")
    setSubmitting(true)
    try {
      await signIn(email, password)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't sign in — check your details and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl, maxWidth: 420 }}>
        <Text
          text="ACCOUNT"
          style={{
            fontFamily: typography.primary.medium,
            color: edgex.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text="Sign in"
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 28, marginBottom: spacing.lg }}
        />

        {!isSupabaseConfigured ? (
          <Text
            text="Supabase isn't configured yet in this build — add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env to enable real sign-in."
            style={{ color: edgex.amber, fontSize: 13, lineHeight: 19, marginBottom: spacing.lg }}
          />
        ) : null}

        {isAuthenticated ? (
          <>
            <Text
              text="You're already signed in."
              style={{ color: edgex.textDim, fontSize: 15, marginBottom: spacing.md }}
            />
            <EdgexPrimaryButton text="Sign out" onPress={signOut} fontFamily={typography.primary.medium} />
          </>
        ) : (
          <>
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              containerStyle={{ marginBottom: spacing.md }}
              style={{ color: edgex.text }}
              inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
              LabelTextProps={{ style: { color: edgex.textDim } }}
              placeholderTextColor={edgex.textDim}
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={{ marginBottom: spacing.md }}
              style={{ color: edgex.text }}
              inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
              LabelTextProps={{ style: { color: edgex.textDim } }}
              placeholderTextColor={edgex.textDim}
            />

            {error ? (
              <Text text={error} style={{ color: edgex.danger, fontSize: 13, marginBottom: spacing.md }} />
            ) : null}

            <EdgexPrimaryButton
              text={submitting ? "Signing in…" : "Sign in"}
              onPress={onSubmit}
              fontFamily={typography.primary.medium}
              disabled={submitting}
            />

            <Text
              text="Need an account? Sign up →"
              onPress={() => navigation.navigate("EdgexSignUp")}
              style={{ color: edgex.textDim, fontSize: 13, marginTop: spacing.lg }}
            />
          </>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
