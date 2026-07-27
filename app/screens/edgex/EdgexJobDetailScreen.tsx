import { FC, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

import { Text } from "@/components/Text"
import { EdgexChip, EdgexListRow, EdgexPrimaryButton } from "@/components/edgex/EdgexPrimitives"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import type { Job } from "@/content/edgexJobs"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { getJob } from "@/services/sync/jobsSync"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexJobDetailScreenProps extends EdgexStackScreenProps<"EdgexJobDetail"> {}

export const EdgexJobDetailScreen: FC<EdgexJobDetailScreenProps> = function EdgexJobDetailScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { jobId } = route.params
  const [job, setJob] = useState<Job | null | undefined>(null)

  useEffect(() => {
    let mounted = true
    getJob(jobId).then((result) => {
      if (mounted) setJob(result ?? null)
    })
    return () => {
      mounted = false
    }
  }, [jobId])

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        {job === null ? (
          <ActivityIndicator color={edgex.signal} />
        ) : job === undefined ? (
          <Text text="This role isn't available anymore." style={{ color: edgex.textDim }} />
        ) : (
          <>
            <Text
              text={job.department.toUpperCase()}
              style={{
                fontFamily: typography.primary.medium,
                color: edgex.signal,
                fontSize: 12,
                letterSpacing: 2,
                marginBottom: spacing.sm,
              }}
            />
            <Text
              text={job.title}
              style={{
                fontFamily: typography.primary.bold,
                color: edgex.text,
                fontSize: 30,
                marginBottom: spacing.sm,
              }}
            />
            <View style={{ flexDirection: "row", gap: spacing.xs, flexWrap: "wrap", marginBottom: spacing.lg }}>
              <EdgexChip label={job.location} fontFamily={typography.primary.medium} outline />
              <EdgexChip label={job.employment_type} fontFamily={typography.primary.medium} outline />
            </View>

            <Text
              text={job.description}
              style={{ color: edgex.textDim, fontSize: 15, lineHeight: 23, marginBottom: spacing.lg }}
            />

            <Text
              text="Requirements"
              style={{
                fontFamily: typography.primary.medium,
                color: edgex.text,
                fontSize: 16,
                marginBottom: spacing.sm,
              }}
            />
            {job.requirements.map((req) => (
              <EdgexListRow key={req} text={req} dotColor={edgex.signal} spacing={spacing.sm} />
            ))}

            <View style={{ marginTop: spacing.lg }}>
              <EdgexPrimaryButton
                text="Apply for this role →"
                onPress={() => navigation.navigate("EdgexApply", { jobId: job.id })}
                fontFamily={typography.primary.medium}
              />
            </View>
          </>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
