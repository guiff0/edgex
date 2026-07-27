import { Pressable, View, useWindowDimensions } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

import { EdgexLogo } from "./EdgexLogo"
import { edgexMono } from "./EdgexPrimitives"

export interface EdgexHeaderProps {
  onMenuPress: () => void
  onNavigate: (route: string) => void
  currentRoute: string
}

const TOP_NAV_LINKS: { label: string; route: string }[] = [
  { label: "Home", route: "EdgexHome" },
  { label: "Products", route: "EdgexProducts" },
  { label: "Services", route: "EdgexServices" },
  { label: "Careers", route: "EdgexCareers" },
  { label: "Contact", route: "EdgexContact" },
]

export function EdgexHeader({ onMenuPress, onNavigate, currentRoute }: EdgexHeaderProps) {
  const { theme } = useAppTheme()
  const { spacing } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: edgex.hairline,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={onMenuPress}
          hitSlop={12}
          style={{ marginRight: spacing.md, padding: 4 }}
          accessibilityLabel="Open menu"
          accessibilityRole="button"
        >
          <View style={{ width: 20, height: 2, backgroundColor: edgex.text, marginBottom: 4, borderRadius: 1 }} />
          <View style={{ width: 20, height: 2, backgroundColor: edgex.text, marginBottom: 4, borderRadius: 1 }} />
          <View style={{ width: 20, height: 2, backgroundColor: edgex.text, borderRadius: 1 }} />
        </Pressable>
        <EdgexLogo size={20} />
      </View>

      {isWide ? (
        <View style={{ flexDirection: "row", gap: spacing.lg }}>
          {TOP_NAV_LINKS.map((link) => (
            <Pressable key={link.route} onPress={() => onNavigate(link.route)}>
              <Text
                text={link.label}
                style={[
                  edgexMono,
                  {
                    fontSize: 12,
                    letterSpacing: 1,
                    color: currentRoute === link.route ? edgex.signal : edgex.textDim,
                  },
                ]}
              />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  )
}
