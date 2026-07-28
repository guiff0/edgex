import { useState } from "react"
import { Pressable, View } from "react-native"

import { Text } from "@/components/Text"
import type { ContentSection } from "@/content/edgexContent"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

export interface EdgexFoldableMenuProps {
  label: string
  sections: ContentSection[]
  onSelect: () => void
}

/**
 * A tap-to-expand accordion listing grouped sub-items (mirrors a desktop
 * mega-menu's columns, e.g. D-Wave's Solutions nav) — since there's no
 * hover state on touch, this expands in place instead. Every sub-item
 * navigates to the same single page (all sections live on one page); the
 * accordion is a preview/index into that page's content, not separate routes.
 */
export function EdgexFoldableMenu({ label, sections, onSelect }: EdgexFoldableMenuProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const [open, setOpen] = useState(false)

  return (
    <View>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Text text={label} style={{ color: edgex.text, fontSize: 15 }} />
        <Text
          text={open ? "−" : "+"}
          style={{ color: edgex.signal, fontSize: 16, fontFamily: typography.primary.medium }}
        />
      </Pressable>

      {open ? (
        <View style={{ paddingLeft: spacing.sm, paddingBottom: spacing.sm }}>
          {sections.map((section) => (
            <View key={section.heading} style={{ marginBottom: spacing.sm }}>
              <Text
                text={section.heading.toUpperCase()}
                style={{
                  fontFamily: typography.primary.medium,
                  color: edgex.amber,
                  fontSize: 10.5,
                  letterSpacing: 1.5,
                  marginBottom: 6,
                }}
              />
              {section.items.map((item) => (
                <Pressable key={item.title} onPress={onSelect} style={{ paddingVertical: 6 }}>
                  <Text text={item.title} style={{ color: edgex.textDim, fontSize: 13 }} />
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  )
}
