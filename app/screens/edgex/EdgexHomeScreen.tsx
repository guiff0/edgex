import { FC } from "react"
import { Linking, View, useWindowDimensions } from "react-native"

import { Text } from "@/components/Text"
import { EdgexDivider, EdgexPrimaryButton, EdgexSection } from "@/components/edgex/EdgexPrimitives"
import { EdgexIllustration } from "@/components/edgex/EdgexIllustration"
import { EdgexLogoImage } from "@/components/edgex/EdgexLogoImage"
import { EdgexPressableScale } from "@/components/edgex/EdgexPressableScale"
import { EdgexScreenShell } from "@/components/edgex/EdgexScreenShell"
import { HOME_CONTENT } from "@/content/edgexContent"
import type { EdgexStackScreenProps } from "@/navigators/edgexNavigationTypes"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

interface EdgexHomeScreenProps extends EdgexStackScreenProps<"EdgexHome"> {}

export const EdgexHomeScreen: FC<EdgexHomeScreenProps> = function EdgexHomeScreen({ route, navigation }) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  const openMail = () => Linking.openURL(`mailto:${HOME_CONTENT.contactEmail}`)

  return (
    <EdgexScreenShell currentRoute={route.name} onNavigate={(r) => navigation.navigate(r as never)}>
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
          <EdgexPrimaryButton text="Talk to the team →" onPress={openMail} fontFamily={typography.primary.medium} />
          <EdgexPrimaryButton
            text="View open roles"
            onPress={() => navigation.navigate("EdgexCareers")}
            fontFamily={typography.primary.medium}
            style={{ backgroundColor: "transparent", borderWidth: 1, borderColor: edgex.steel, color: edgex.text }}
          />
        </View>

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
              <Text
                text={h.title}
                style={{ fontFamily: typography.primary.bold, color: edgex.teal, fontSize: 28 }}
              />
              <Text text={h.label} style={{ color: edgex.textDim, fontSize: 12, letterSpacing: 1 }} />
            </EdgexPressableScale>
          ))}
        </View>
      </View>

      <EdgexDivider label="EXPLORE" spacing={spacing.lg} />

      <EdgexSection title="Where to go next" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={{ gap: spacing.sm }}>
          {[
            { label: "Products — QPU series, cryogenics, MMR power modules", route: "EdgexProducts" },
            { label: "Services — QML, optimization, security, cloud", route: "EdgexServices" },
            { label: "Careers — open roles across every division", route: "EdgexCareers" },
            { label: "About Us — corporate identity & mission", route: "EdgexAbout" },
          ].map((item) => (
            <EdgexPressableScale key={item.route} onPress={() => navigation.navigate(item.route as never)}>
              <Text text={item.label} style={{ color: edgex.text, fontSize: 15, paddingVertical: 8 }} />
            </EdgexPressableScale>
          ))}
        </View>
      </EdgexSection>

      <View style={{ height: spacing.xxl }} />
    </EdgexScreenShell>
  )
}
