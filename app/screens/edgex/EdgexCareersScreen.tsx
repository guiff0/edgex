import { FC, useEffect, useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"

import { Text } from "@/components/Text"
import { EdgexAuthGate } from "@/components/edgex/EdgexAuthGate"
import { EdgexChip } from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration } from "@/components/edgex/EdgexIllustration"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import type { Job } from "@/content/edgexJobs"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { getJobs } from "@/services/watermelon/jobsSync"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexCareersScreenProps extends EdgexStackScreenProps<"EdgexCareers"> {}

export const EdgexCareersScreen: FC<EdgexCareersScreenProps> = function EdgexCareersScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const [jobs, setJobs] = useState<Job[] | null>(null)

  useEffect(() => {
    let mounted = true
    getJobs().then((result) => {
      if (mounted) setJobs(result)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <EdgexIllustration variant="careers" height={150} style={{ marginBottom: spacing.lg }} />
        <Text
          text="CAREERS"
          style={{
            fontFamily: typography.primary.medium,
            color: edgex.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text="Open roles"
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 32, marginBottom: spacing.md }}
        />
        <Text
          text="Every division is hiring — quantum engineering, software, advanced energy systems, and enterprise delivery."
          style={{ color: edgex.textDim, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg }}
        />
      </View>

      <EdgexAuthGate
        onNavigateToSignUp={() => navigation.navigate("EdgexSignUp")}
        title="Sign in to view open roles"
        subtitle="We ask candidates to sign in so we can keep applications connected to your account and follow up on the right thread."
      >
        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}>
          {jobs === null ? (
            <ActivityIndicator color={edgex.signal} style={{ marginTop: spacing.lg }} />
          ) : jobs.length === 0 ? (
            <Text text="No open roles right now — check back soon." style={{ color: edgex.textDim }} />
          ) : (
            jobs.map((job) => (
              <Pressable
                key={job.id}
                onPress={() => navigation.navigate("EdgexJobDetail", { jobId: job.id })}
                style={{
                  backgroundColor: edgex.surface,
                  borderWidth: 1,
                  borderColor: edgex.hairline,
                  borderRadius: 10,
                  padding: spacing.md,
                }}
              >
                <Text
                  text={job.title}
                  style={{ fontFamily: typography.primary.medium, color: edgex.text, fontSize: 17, marginBottom: 4 }}
                />
                <Text text={job.department} style={{ color: edgex.textDim, fontSize: 13, marginBottom: spacing.sm }} />
                <View style={{ flexDirection: "row", gap: spacing.xs, flexWrap: "wrap" }}>
                  <EdgexChip label={job.location} fontFamily={typography.primary.medium} outline />
                  <EdgexChip label={job.employment_type} fontFamily={typography.primary.medium} outline />
                </View>
              </Pressable>
            ))
          )}
        </View>
      </EdgexAuthGate>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
