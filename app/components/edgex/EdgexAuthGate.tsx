import { ReactNode } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { useSupabaseAuth } from "@/services/supabase/useSupabaseAuth"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

import { EdgexMiniLoginPanel } from "./EdgexMiniLoginPanel"

export interface EdgexAuthGateProps {
  children: ReactNode
  onNavigateToSignUp: () => void
  title?: string
  subtitle?: string
}

/**
 * Gates its children behind a signed-in Supabase session. Used on Careers,
 * Job Detail, and Apply so browsing and applying to roles requires an
 * identified user — shows the compact login panel in place of the content
 * rather than redirecting away, so the person doesn't lose their place.
 */
export function EdgexAuthGate({
  children,
  onNavigateToSignUp,
  title = "Sign in to view open roles",
  subtitle = "We ask candidates to sign in so we can keep your application connected to your account.",
}: EdgexAuthGateProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { isAuthenticated, loading } = useSupabaseAuth()

  if (loading) return null

  if (!isAuthenticated) {
    return (
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl, alignItems: "flex-start" }}>
        <Text
          text={title}
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 24, marginBottom: 6 }}
        />
        <Text text={subtitle} style={{ color: edgex.textDim, fontSize: 14, lineHeight: 20, marginBottom: spacing.lg, maxWidth: 420 }} />
        <EdgexMiniLoginPanel onCreateAccount={onNavigateToSignUp} />
      </View>
    )
  }

  return <>{children}</>
}
