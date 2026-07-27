import { Pressable, ScrollView, View } from "react-native"

import { Text } from "@/components/Text"
import { LEFT_MENU, TOP_NAV } from "@/content/edgexContent"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

import { EdgexLogo } from "./EdgexLogo"

export interface EdgexDrawerContentProps {
  onNavigate: (route: string) => void
  onClose: () => void
}

export function EdgexDrawerContent({ onNavigate, onClose }: EdgexDrawerContentProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme

  const go = (route: string) => {
    onNavigate(route)
    onClose()
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: edgex.surface }}
      contentContainerStyle={{ paddingVertical: spacing.xl, paddingHorizontal: spacing.lg }}
    >
      <EdgexLogo size={24} style={{ marginBottom: spacing.lg }} />

      <Text
        text="MENU"
        style={{
          fontFamily: typography.primary.medium,
          color: edgex.steel,
          fontSize: 11,
          letterSpacing: 2,
          marginBottom: spacing.sm,
        }}
      />
      {TOP_NAV.map((item) => (
        <Pressable key={item.route} onPress={() => go(item.route)} style={{ paddingVertical: 10 }}>
          <Text text={item.label} style={{ color: edgex.text, fontSize: 15 }} />
        </Pressable>
      ))}

      <View style={{ height: 1, backgroundColor: edgex.hairline, marginVertical: spacing.lg }} />

      <Text
        text="TECHNICAL SECTIONS"
        style={{
          fontFamily: typography.primary.medium,
          color: edgex.steel,
          fontSize: 11,
          letterSpacing: 2,
          marginBottom: spacing.sm,
        }}
      />
      {LEFT_MENU.map((item) => (
        <Pressable
          key={item.label}
          onPress={() =>
            go(
              item.pageKey === "products"
                ? "EdgexProducts"
                : item.pageKey === "departments"
                  ? "EdgexDepartments"
                  : "EdgexServices",
            )
          }
          style={{ paddingVertical: 9 }}
        >
          <Text text={item.label} style={{ color: edgex.textDim, fontSize: 13.5 }} />
        </Pressable>
      ))}
    </ScrollView>
  )
}
