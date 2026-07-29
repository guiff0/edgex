import { FC, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"

import { Text } from "@/components/Text"
import { EdgexAuthGate } from "@/components/edgex/EdgexAuthGate"
import { EdgexChip } from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration } from "@/components/edgex/EdgexIllustration"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import { JOB_FIELDS, JOB_ROLES, type Job, type JobField, type JobRole } from "@/content/edgexJobs"
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
  const [roleFilter, setRoleFilter] = useState<JobRole | null>(null)
  const [fieldFilter, setFieldFilter] = useState<JobField | null>(null)

  useEffect(() => {
    let mounted = true
    getJobs().then((result) => {
      if (mounted) setJobs(result)
    })
    return () => {
      mounted = false
    }
  }, [])

  const filteredJobs = useMemo(() => {
    if (!jobs) return null
    return jobs.filter(
      (job) => (!roleFilter || job.role === roleFilter) && (!fieldFilter || job.field === fieldFilter),
    )
  }, [jobs, roleFilter, fieldFilter])

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
        <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
          <Text
            text="FUNCTION ROLE"
            style={{
              fontFamily: typography.primary.medium,
              color: edgex.steel,
              fontSize: 11,
              letterSpacing: 1.5,
              marginBottom: spacing.xs,
            }}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, marginBottom: spacing.md }}>
            <EdgexChip
              label="All"
              fontFamily={typography.primary.medium}
              outline
              selected={roleFilter === null}
              onPress={() => setRoleFilter(null)}
            />
            {JOB_ROLES.map((r) => (
              <EdgexChip
                key={r}
                label={r}
                fontFamily={typography.primary.medium}
                outline
                selected={roleFilter === r}
                onPress={() => setRoleFilter(roleFilter === r ? null : r)}
              />
            ))}
          </View>

          <Text
            text="FIELD"
            style={{
              fontFamily: typography.primary.medium,
              color: edgex.steel,
              fontSize: 11,
              letterSpacing: 1.5,
              marginBottom: spacing.xs,
            }}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
            <EdgexChip
              label="All"
              fontFamily={typography.primary.medium}
              outline
              selected={fieldFilter === null}
              onPress={() => setFieldFilter(null)}
            />
            {JOB_FIELDS.map((f) => (
              <EdgexChip
                key={f}
                label={f}
                fontFamily={typography.primary.medium}
                outline
                selected={fieldFilter === f}
                onPress={() => setFieldFilter(fieldFilter === f ? null : f)}
              />
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}>
          {filteredJobs === null ? (
            <ActivityIndicator color={edgex.signal} style={{ marginTop: spacing.lg }} />
          ) : filteredJobs.length === 0 ? (
            <Text
              text="No roles match those filters right now — try a different combination."
              style={{ color: edgex.textDim }}
            />
          ) : (
            <>
              <Text
                text={`${filteredJobs.length} open role${filteredJobs.length === 1 ? "" : "s"}`}
                style={{ color: edgex.steel, fontSize: 12, marginBottom: spacing.xs }}
              />
              {filteredJobs.map((job) => (
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
                    style={{
                      fontFamily: typography.primary.medium,
                      color: edgex.text,
                      fontSize: 17,
                      marginBottom: 4,
                    }}
                  />
                  <Text
                    text={job.department}
                    style={{ color: edgex.textDim, fontSize: 13, marginBottom: spacing.sm }}
                  />
                  <View style={{ flexDirection: "row", gap: spacing.xs, flexWrap: "wrap" }}>
                    <EdgexChip label={job.field} fontFamily={typography.primary.medium} outline />
                    <EdgexChip label={job.location} fontFamily={typography.primary.medium} outline />
                    <EdgexChip label={job.employment_type} fontFamily={typography.primary.medium} outline />
                  </View>
                </Pressable>
              ))}
            </>
          )}
        </View>
      </EdgexAuthGate>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
