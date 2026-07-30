import { FC, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, Pressable, View } from "react-native"

import { Text } from "@/components/Text"
import { EdgexChip, EdgexPrimaryButton } from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration } from "@/components/edgex/EdgexIllustration"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import {
  JOB_FIELDS,
  JOB_LOCATIONS,
  JOB_ROLES,
  type Job,
  type JobField,
  type JobLocation,
  type JobRole,
} from "@/content/edgexJobs"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { getJobs } from "@/services/watermelon/jobsSync"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexCareersScreenProps extends EdgexStackScreenProps<"EdgexCareers"> {}

function FilterRow<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: T[]
  selected: T | null
  onSelect: (value: T | null) => void
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text
        text={label}
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
          selected={selected === null}
          onPress={() => onSelect(null)}
        />
        {options.map((opt) => (
          <EdgexChip
            key={opt}
            label={opt}
            fontFamily={typography.primary.medium}
            outline
            selected={selected === opt}
            onPress={() => onSelect(selected === opt ? null : opt)}
          />
        ))}
      </View>
    </View>
  )
}

export const EdgexCareersScreen: FC<EdgexCareersScreenProps> = function EdgexCareersScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [roleFilter, setRoleFilter] = useState<JobRole | null>(null)
  const [fieldFilter, setFieldFilter] = useState<JobField | null>(null)
  const [locationFilter, setLocationFilter] = useState<JobLocation | null>(null)

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
      (job) =>
        (!roleFilter || job.role === roleFilter) &&
        (!fieldFilter || job.field === fieldFilter) &&
        (!locationFilter || job.locationCategory === locationFilter),
    )
  }, [jobs, roleFilter, fieldFilter, locationFilter])

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
          text="Every division is hiring — quantum engineering, software, advanced energy systems, and enterprise delivery. Browse freely; you'll only need to sign in when you're ready to apply."
          style={{ color: edgex.textDim, fontSize: 15, lineHeight: 22, marginBottom: spacing.lg }}
        />
      </View>

      <View style={{ paddingHorizontal: spacing.lg, marginBottom: spacing.md }}>
        <FilterRow label="JOB CATEGORY" options={JOB_FIELDS} selected={fieldFilter} onSelect={setFieldFilter} />
        <FilterRow label="JOB FUNCTION" options={JOB_ROLES} selected={roleFilter} onSelect={setRoleFilter} />
        <FilterRow
          label="JOB LOCATION"
          options={JOB_LOCATIONS}
          selected={locationFilter}
          onSelect={setLocationFilter}
        />
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
              <View
                key={job.id}
                style={{
                  backgroundColor: edgex.surface,
                  borderWidth: 1,
                  borderColor: edgex.hairline,
                  borderRadius: 10,
                  padding: spacing.md,
                }}
              >
                <Pressable onPress={() => navigation.navigate("EdgexJobDetail", { jobId: job.id })}>
                  {job.jobIdentification ? (
                    <Text
                      text={`JOB ID ${job.jobIdentification}`}
                      style={{
                        fontFamily: typography.primary.medium,
                        color: edgex.steel,
                        fontSize: 10.5,
                        letterSpacing: 1,
                        marginBottom: 4,
                      }}
                    />
                  ) : null}
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
                  <View style={{ flexDirection: "row", gap: spacing.xs, flexWrap: "wrap", marginBottom: spacing.md }}>
                    <EdgexChip label={job.field} fontFamily={typography.primary.medium} outline />
                    <EdgexChip label={job.location} fontFamily={typography.primary.medium} outline />
                    <EdgexChip label={job.employment_type} fontFamily={typography.primary.medium} outline />
                  </View>
                </Pressable>

                <View style={{ flexDirection: "row", gap: spacing.sm }}>
                  <EdgexPrimaryButton
                    text="Apply →"
                    onPress={() => navigation.navigate("EdgexApply", { jobId: job.id })}
                    fontFamily={typography.primary.medium}
                  />
                  <EdgexPrimaryButton
                    text="View details"
                    onPress={() => navigation.navigate("EdgexJobDetail", { jobId: job.id })}
                    fontFamily={typography.primary.medium}
                    style={{ backgroundColor: "transparent", borderWidth: 1, borderColor: edgex.steel, color: edgex.text }}
                  />
                </View>
              </View>
            ))}
          </>
        )}
      </View>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
