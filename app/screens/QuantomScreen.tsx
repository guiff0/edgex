import { FC } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import {
  EdgexCard,
  EdgexDivider,
  EdgexListRow,
  EdgexSection,
} from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration, type EdgexIllustrationVariant } from "@/components/edgex/EdgexIllustration"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import { PAGES } from "@/content/edgexContent"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

const PAGE_KEY_TO_ILLUSTRATION: Record<string, EdgexIllustrationVariant> = {
  products: "products",
  services: "services",
  technologies: "technologies",
  industries: "industries",
  departments: "departments",
  about: "about",
  contact: "contact",
  leadership: "leadership",
  legal: "legal",
  governance: "governance",
  documentation: "documentation",
  "api-access": "api",
  whitepapers: "whitepapers",
  "case-studies": "caseStudies",
  newsroom: "newsroom",
}

interface QuantomScreenProps extends EdgexStackScreenProps<
  | "EdgexProducts"
  | "EdgexServices"
  | "EdgexTechnologies"
  | "EdgexIndustries"
  | "EdgexDepartments"
  | "EdgexAbout"
  | "EdgexContact"
  | "EdgexLeadership"
  | "EdgexLegal"
  | "EdgexGovernance"
  | "EdgexDocumentation"
  | "EdgexApiAccess"
  | "EdgexWhitepapers"
  | "EdgexCaseStudies"
  | "EdgexNewsroom"
> {}

export const QuantomScreen: FC<QuantomScreenProps> = function QuantomScreen({
  route,
  navigation,
}) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const pageKey = (route.params as { pageKey: string } | undefined)?.pageKey ?? "products"
  const page = PAGES[pageKey]

  if (!page) return null

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl }}>
        <EdgexIllustration
          variant={PAGE_KEY_TO_ILLUSTRATION[pageKey] ?? "products"}
          height={160}
          style={{ marginBottom: spacing.lg }}
        />
        <Text
          text={page.kicker}
          style={{
            fontFamily: typography.primary.medium,
            color: edgex.signal,
            fontSize: 12,
            letterSpacing: 2,
            marginBottom: spacing.sm,
          }}
        />
        <Text
          text={page.title}
          style={{
            fontFamily: typography.primary.bold,
            color: edgex.text,
            fontSize: 32,
            lineHeight: 38,
            marginBottom: spacing.md,
          }}
        />
        <Text
          text={page.intro}
          style={{ color: edgex.textDim, fontSize: 15, lineHeight: 23, marginBottom: spacing.lg }}
        />
      </View>

      {page.sections.map((section, i) => (
        <View key={section.heading}>
          {i > 0 ? <EdgexDivider label={section.heading.toUpperCase()} spacing={spacing.lg} /> : null}
          <EdgexSection
            title={i === 0 ? section.heading : ""}
            spacing={spacing.lg}
            titleFontFamily={typography.primary.bold}
          >
            {section.layout === "cards" ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                {section.items.map((item) => (
                  <EdgexCard
                    key={item.title}
                    title={item.title}
                    body={item.body}
                    accentColor={edgex.teal}
                    spacing={spacing.md}
                    titleFontFamily={typography.primary.medium}
                  />
                ))}
              </View>
            ) : (
              section.items.map((item) => (
                <EdgexListRow
                  key={item.title}
                  text={item.body ? `${item.title} — ${item.body}` : item.title}
                  dotColor={edgex.signal}
                  spacing={spacing.sm}
                />
              ))
            )}
          </EdgexSection>
        </View>
      ))}

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
