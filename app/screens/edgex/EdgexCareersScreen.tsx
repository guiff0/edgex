import { FC, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, Pressable, TextInput, View, useWindowDimensions } from "react-native"

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

/** Small colored-dot "icon" row — location/category/function markers, mirroring the
 * pin/gear/list icon rows on the JPMorgan Chase careers reference, without needing
 * an icon font dependency. */
function MetaRow({ dotColor, text }: { dotColor: string; text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor, marginRight: 8 }} />
      <Text text={text} style={{ color: edgex.textDim, fontSize: 12.5 }} />
    </View>
  )
}

export const EdgexCareersScreen: FC<EdgexCareersScreenProps> = function EdgexCareersScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [roleFilter, setRoleFilter] = useState<JobRole | null>(null)
  const [fieldFilter, setFieldFilter] = useState<JobField | null>(null)
  const [locationFilter, setLocationFilter] = useState<JobLocation | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortDesc, setSortDesc] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [locationQuery, setLocationQuery] = useState("")

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
    const kw = keyword.trim().toLowerCase()
    const loc = locationQuery.trim().toLowerCase()

    const result = jobs.filter(
      (job) =>
        (!roleFilter || job.role === roleFilter) &&
        (!fieldFilter || job.field === fieldFilter) &&
        (!locationFilter || job.locationCategory === locationFilter) &&
        (!kw ||
          job.title.toLowerCase().includes(kw) ||
          job.field.toLowerCase().includes(kw) ||
          job.summary.toLowerCase().includes(kw)) &&
        (!loc || job.location.toLowerCase().includes(loc)),
    )

    return [...result].sort((a, b) =>
      sortDesc ? b.posted_at.localeCompare(a.posted_at) : a.posted_at.localeCompare(b.posted_at),
    )
  }, [jobs, roleFilter, fieldFilter, locationFilter, keyword, locationQuery, sortDesc])

  const cardBasis = isWide ? "31%" : "100%"

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

        {/* Search bar: keyword + location, JPMorgan-Chase-reference style */}
        <View
          style={[
            { flexDirection: "column", gap: spacing.xs },
            isWide && { flexDirection: "row", alignItems: "stretch" },
          ]}
        >
          <View
            style={{
              flex: isWide ? 2 : undefined,
              backgroundColor: edgex.surface,
              borderWidth: 1,
              borderColor: edgex.hairline,
              borderRadius: 10,
              paddingHorizontal: spacing.md,
              paddingVertical: 10,
            }}
          >
            <Text
              text="FIND JOBS"
              style={{ fontFamily: typography.primary.medium, color: edgex.steel, fontSize: 10, letterSpacing: 1.5 }}
            />
            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="Job title, skill, keyword"
              placeholderTextColor={edgex.textDim}
              style={{ color: edgex.text, fontSize: 15, paddingVertical: 4 }}
            />
          </View>
          <View
            style={{
              flex: isWide ? 1 : undefined,
              backgroundColor: edgex.surface,
              borderWidth: 1,
              borderColor: edgex.hairline,
              borderRadius: 10,
              paddingHorizontal: spacing.md,
              paddingVertical: 10,
            }}
          >
            <Text
              text="NEAR LOCATION"
              style={{ fontFamily: typography.primary.medium, color: edgex.steel, fontSize: 10, letterSpacing: 1.5 }}
            />
            <TextInput
              value={locationQuery}
              onChangeText={setLocationQuery}
              placeholder="City, state, country"
              placeholderTextColor={edgex.textDim}
              style={{ color: edgex.text, fontSize: 15, paddingVertical: 4 }}
            />
          </View>
        </View>
      </View>

      {/* Open-jobs count + filter/sort controls */}
      <View
        style={{
          paddingHorizontal: spacing.lg,
          marginTop: spacing.lg,
          marginBottom: spacing.md,
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: spacing.sm,
        }}
      >
        <Text
          text={filteredJobs === null ? "…" : `${filteredJobs.length} OPEN ROLE${filteredJobs.length === 1 ? "" : "S"}`}
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 14 }}
        />
        <View style={{ width: 1, height: 16, backgroundColor: edgex.hairline }} />
        <EdgexChip
          label={showFilters ? "Filters ▲" : "Filters ▾"}
          fontFamily={typography.primary.medium}
          outline
          selected={showFilters}
          onPress={() => setShowFilters((v) => !v)}
        />
        <Pressable
          onPress={() => setSortDesc((v) => !v)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: edgex.steel,
            borderRadius: 999,
            paddingVertical: 8,
            paddingHorizontal: 14,
          }}
        >
          <Text
            text={`Posting Date ${sortDesc ? "↓" : "↑"}`}
            style={{ fontFamily: typography.primary.medium, color: edgex.text, fontSize: 13 }}
          />
        </Pressable>
      </View>

      {showFilters ? (
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
      ) : null}

      <View style={{ paddingHorizontal: spacing.lg, flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
        {filteredJobs === null ? (
          <ActivityIndicator color={edgex.signal} style={{ marginTop: spacing.lg }} />
        ) : filteredJobs.length === 0 ? (
          <Text
            text="No roles match those filters right now — try a different combination."
            style={{ color: edgex.textDim }}
          />
        ) : (
          <>
            {filteredJobs.map((job) => (
              <View
                key={job.id}
                style={{
                  flexBasis: cardBasis,
                  flexGrow: 1,
                  minWidth: 260,
                  backgroundColor: edgex.surface,
                  borderWidth: 1,
                  borderColor: edgex.hairline,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Pressable onPress={() => navigation.navigate("EdgexJobDetail", { jobId: job.id })}>
                  {/* Two-tone header, mirroring the reference card's shaded top half */}
                  <View
                    style={{
                      backgroundColor: edgex.surfaceRaised,
                      padding: spacing.md,
                      borderBottomWidth: 1,
                      borderBottomColor: edgex.hairline,
                    }}
                  >
                    {job.jobIdentification ? (
                      <Text
                        text={`JOB ID ${job.jobIdentification}`}
                        style={{
                          fontFamily: typography.primary.medium,
                          color: edgex.steel,
                          fontSize: 10,
                          letterSpacing: 1,
                          marginBottom: 4,
                        }}
                      />
                    ) : null}
                    <Text
                      text={job.title}
                      style={{
                        fontFamily: typography.primary.bold,
                        color: edgex.text,
                        fontSize: 17,
                        lineHeight: 22,
                        marginBottom: spacing.sm,
                      }}
                    />
                    <MetaRow dotColor={edgex.signal} text={job.location} />
                    <MetaRow dotColor={edgex.teal} text={job.field} />
                    <MetaRow dotColor={edgex.silverBright} text={job.role} />
                  </View>

                  {/* Body: short description, mirroring the reference card's white lower half */}
                  <View style={{ padding: spacing.md }}>
                    <Text
                      text={job.summary}
                      numberOfLines={3}
                      style={{ color: edgex.textDim, fontSize: 13, lineHeight: 19, marginBottom: spacing.md }}
                    />
                  </View>
                </Pressable>

                <View style={{ flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.md }}>
                  <EdgexPrimaryButton
                    text="Apply →"
                    onPress={() => navigation.navigate("EdgexApply", { jobId: job.id })}
                    fontFamily={typography.primary.medium}
                    style={{ paddingVertical: 7, paddingHorizontal: 13, fontSize: 12.5 }}
                  />
                  <EdgexPrimaryButton
                    text="View details"
                    onPress={() => navigation.navigate("EdgexJobDetail", { jobId: job.id })}
                    fontFamily={typography.primary.medium}
                    style={{
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: edgex.steel,
                      color: edgex.text,
                      paddingVertical: 7,
                      paddingHorizontal: 13,
                      fontSize: 12.5,
                    }}
                  />
                </View>
              </View>
            ))}

            {/* Talent-network-style CTA tile, mirroring the dark card mixed into the reference grid */}
            <View
              style={{
                flexBasis: cardBasis,
                flexGrow: 1,
                minWidth: 260,
                backgroundColor: edgex.ink,
                borderWidth: 1,
                borderColor: edgex.hairline,
                borderRadius: 10,
                padding: spacing.lg,
                justifyContent: "center",
              }}
            >
              <Text
                text="Didn't find the right role?"
                style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 18, marginBottom: 6 }}
              />
              <Text
                text="Reach out directly — we're growing across every division."
                style={{ color: edgex.textDim, fontSize: 13, lineHeight: 19, marginBottom: spacing.md }}
              />
              <EdgexPrimaryButton
                text="Request a Consultation →"
                onPress={() => navigation.navigate("EdgexContact")}
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
