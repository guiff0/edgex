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

interface EdgexSignUpScreenProps extends EdgexStackScreenProps<"EdgexSignUp"> {}

export const EdgexSignUpScreen: FC<EdgexSignUpScreenProps> = function EdgexSignUpScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { signUp } = useSupabaseAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const onSubmit = async () => {
    setError("")
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setSubmitting(true)
    try {
      await signUp(email, password, fullName)
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't create your account — please try again.")
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
          text="Create an account"
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 28, marginBottom: spacing.lg }}
        />

        {!isSupabaseConfigured ? (
          <Text
            text="Supabase isn't configured yet in this build — add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env to enable real sign-up."
            style={{ color: edgex.amber, fontSize: 13, lineHeight: 19, marginBottom: spacing.lg }}
          />
        ) : null}

        {done ? (
          <>
            <Text
              text="Check your email to confirm your account, then sign in."
              style={{ color: edgex.textDim, fontSize: 15, marginBottom: spacing.md }}
            />
            <EdgexPrimaryButton
              text="Go to sign in"
              onPress={() => navigation.navigate("EdgexLogin")}
              fontFamily={typography.primary.medium}
            />
          </>
        ) : (
          <>
            <TextField
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              containerStyle={{ marginBottom: spacing.md }}
              style={{ color: edgex.text }}
              inputWrapperStyle={{ backgroundColor: edgex.surface, borderColor: edgex.hairline }}
              LabelTextProps={{ style: { color: edgex.textDim } }}
              placeholderTextColor={edgex.textDim}
            />
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
              text={submitting ? "Creating account…" : "Create account"}
              onPress={onSubmit}
              fontFamily={typography.primary.medium}
              disabled={submitting}
            />

            <Text
              text="Already have an account? Sign in →"
              onPress={() => navigation.navigate("EdgexLogin")}
              style={{ color: edgex.textDim, fontSize: 13, marginTop: spacing.lg }}
            />
          </>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
