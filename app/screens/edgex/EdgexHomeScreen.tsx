import { FC } from "react"
import { Linking, View, useWindowDimensions } from "react-native"

import { Text } from "@/components/Text"
import {
  EdgexCard,
  EdgexDivider,
  EdgexPrimaryButton,
  EdgexSection,
} from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration } from "@/components/edgex/EdgexIllustration"
import { EdgexLogoImage } from "@/components/edgex/EdgexLogoImage"
import { EdgexMiniLoginPanel } from "@/components/edgex/EdgexMiniLoginPanel"
import { EdgexPressableScale } from "@/components/edgex/EdgexPressableScale"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import { HOME_CONTENT, PAGES, TRUST_SIGNALS, WHY_US } from "@/content/edgexContent"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexHomeScreenProps extends EdgexStackScreenProps<"EdgexHome"> {}

const PRODUCT_SERVICE_HIGHLIGHTS = [
  { title: "QPU Series", body: "Five custom-engineered quantum processor architectures.", route: "EdgexProducts" },
  { title: "Quantum Data Centers", body: "Nuclear-powered, cryogenic-ready compute facilities.", route: "EdgexProducts" },
  { title: "Quantum Machine Learning", body: "Hybrid quantum-classical pipelines for enterprise data.", route: "EdgexServices" },
  { title: "Quantum Security", body: "Quantum-resistant cryptography and threat detection.", route: "EdgexServices" },
]

export const EdgexHomeScreen: FC<EdgexHomeScreenProps> = function EdgexHomeScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  const openMail = () => Linking.openURL(`mailto:${HOME_CONTENT.contactEmail}`)
  const goTo = (r: string) => navigation.navigate(r as never)

  const industryTeaser = PAGES.industries.sections[0]?.items.slice(0, 4) ?? []

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
      {/* HERO */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.lg }}>
        <View style={{ marginBottom: spacing.lg }}>
          <EdgexIllustration variant="home" height={220} />
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            pointerEvents="none"
          >
            <EdgexLogoImage size={128} />
          </View>
        </View>

        <View style={[{ flexDirection: "column" }, isWide && { flexDirection: "row", gap: spacing.xl }]}>
          <View style={{ flex: 1 }}>
            <Text
              text={HOME_CONTENT.eyebrow}
              style={{
                fontFamily: typography.primary.medium,
                color: edgex.signal,
                fontSize: 12,
                letterSpacing: 2,
                marginBottom: spacing.sm,
              }}
            />
            <Text
              text={HOME_CONTENT.headline}
              style={{
                fontFamily: typography.primary.bold,
                color: edgex.text,
                fontSize: 38,
                lineHeight: 44,
                marginBottom: spacing.md,
                maxWidth: 620,
              }}
            />
            <Text
              text={HOME_CONTENT.body}
              style={{ color: edgex.textDim, fontSize: 16, lineHeight: 24, marginBottom: spacing.sm, maxWidth: 560 }}
            />
            <Text
              text={HOME_CONTENT.subBody}
              style={{ color: edgex.steel, fontSize: 13.5, lineHeight: 20, marginBottom: spacing.lg, maxWidth: 560 }}
            />

            <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
              <EdgexPrimaryButton
                text="Request a Consultation →"
                onPress={openMail}
                fontFamily={typography.primary.medium}
              />
              <EdgexPrimaryButton
                text="Explore Solutions"
                onPress={() => goTo("EdgexServices")}
                fontFamily={typography.primary.medium}
                style={{ backgroundColor: "transparent", borderWidth: 1, borderColor: edgex.steel, color: edgex.text }}
              />
              <EdgexPrimaryButton
                text="View Open Roles"
                onPress={() => goTo("EdgexCareers")}
                fontFamily={typography.primary.medium}
                style={{ backgroundColor: "transparent", borderWidth: 1, borderColor: edgex.steel, color: edgex.text }}
              />
            </View>
          </View>

          {/* Embedded sign-in panel — identifies returning visitors right on the landing page */}
          <View style={{ marginTop: isWide ? 0 : spacing.lg, width: isWide ? 320 : undefined }}>
            <EdgexMiniLoginPanel onCreateAccount={() => goTo("EdgexSignUp")} />
          </View>
        </View>

        {/* Stat highlights */}
        <View
          style={[
            { flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginTop: spacing.xl },
            isWide && { flexWrap: "nowrap" },
          ]}
        >
          {HOME_CONTENT.highlights.map((h) => (
            <EdgexPressableScale
              key={h.label}
              style={{
                flexGrow: 1,
                flexBasis: "30%",
                backgroundColor: edgex.surface,
                borderWidth: 1,
                borderColor: edgex.hairline,
                borderRadius: 10,
                padding: spacing.md,
              }}
            >
              <Text text={h.title} style={{ fontFamily: typography.primary.bold, color: edgex.teal, fontSize: 28 }} />
              <Text text={h.label} style={{ color: edgex.textDim, fontSize: 12, letterSpacing: 1 }} />
            </EdgexPressableScale>
          ))}
        </View>
      </View>

      <EdgexDivider label="PRODUCTS & SERVICES" spacing={spacing.lg} />

      <EdgexSection title="What we build" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {PRODUCT_SERVICE_HIGHLIGHTS.map((item) => (
            <EdgexPressableScale
              key={item.title}
              onPress={() => goTo(item.route)}
              style={{ flexGrow: 1, flexBasis: "45%", minWidth: 220 }}
            >
              <EdgexCard
                title={item.title}
                body={item.body}
                accentColor={edgex.signal}
                spacing={spacing.md}
                titleFontFamily={typography.primary.medium}
              />
            </EdgexPressableScale>
          ))}
        </View>
      </EdgexSection>

      <EdgexDivider label="WHY EDGEX" spacing={spacing.lg} />

      <EdgexSection title="Why EDGEX" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {WHY_US.map((item) => (
            <EdgexCard
              key={item.title}
              title={item.title}
              body={item.body}
              accentColor={edgex.teal}
              spacing={spacing.md}
              titleFontFamily={typography.primary.medium}
              style={{ flexBasis: "30%", minWidth: 220 }}
            />
          ))}
        </View>
      </EdgexSection>

      <EdgexDivider label="INDUSTRIES" spacing={spacing.lg} />

      <EdgexSection
        title="Does this apply to your industry?"
        spacing={spacing.lg}
        titleFontFamily={typography.primary.bold}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md }}>
          {industryTeaser.map((item) => (
            <EdgexPressableScale
              key={item.title}
              onPress={() => goTo("EdgexIndustries")}
              style={{ flexGrow: 1, flexBasis: "45%", minWidth: 220 }}
            >
              <EdgexCard
                title={item.title}
                body={item.body}
                accentColor={edgex.signal}
                spacing={spacing.md}
                titleFontFamily={typography.primary.medium}
              />
            </EdgexPressableScale>
          ))}
        </View>
        <Text
          text="See all industries →"
          onPress={() => goTo("EdgexIndustries")}
          style={{ color: edgex.signal, fontSize: 13 }}
        />
      </EdgexSection>

      <EdgexDivider label="TRUST & COMPLIANCE" spacing={spacing.lg} />

      <EdgexSection title="Trust & compliance" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {TRUST_SIGNALS.map((item) => (
            <EdgexCard
              key={item.title}
              title={item.title}
              body={item.body}
              accentColor={edgex.silverBright}
              spacing={spacing.md}
              titleFontFamily={typography.primary.medium}
              style={{ flexBasis: "45%", minWidth: 220 }}
            />
          ))}
        </View>
      </EdgexSection>

      {/* Closing CTA band */}
      <View
        style={{
          marginHorizontal: spacing.lg,
          marginTop: spacing.xl,
          padding: spacing.lg,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: edgex.hairline,
          backgroundColor: edgex.surface,
        }}
      >
        <Text
          text="Ready to scope an engagement?"
          style={{ fontFamily: typography.primary.bold, color: edgex.text, fontSize: 20, marginBottom: 6 }}
        />
        <Text
          text="Enterprise Solutions can assess whether your workload has a genuine quantum advantage before you commit to a build."
          style={{ color: edgex.textDim, fontSize: 14, lineHeight: 20, marginBottom: spacing.md, maxWidth: 480 }}
        />
        <EdgexPrimaryButton text="Request a Consultation →" onPress={openMail} fontFamily={typography.primary.medium} />
      </View>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
