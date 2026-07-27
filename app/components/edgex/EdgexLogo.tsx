import { View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

export interface EdgexLogoProps {
  size?: number
  showWordmark?: boolean
  style?: ViewStyle
}

/**
 * The EDGEX mark: a nested diamond — an outer signal-blue diamond with an
 * inner ink-colored diamond cut into one corner, suggesting a chip corner /
 * cut edge (the "edge" in EDGEX). Built entirely from rotated Views so it
 * needs no SVG library and renders identically on native and web.
 */
export function EdgexLogo({ size = 22, showWordmark = true, style }: EdgexLogoProps) {
  const { theme } = useAppTheme()
  const { typography } = theme
  const inner = size * 0.5

  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: edgex.signal,
          borderRadius: 3,
          transform: [{ rotate: "45deg" }],
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: inner,
            height: inner,
            backgroundColor: edgex.ink,
            borderRadius: 1,
            position: "absolute",
            top: -inner / 2,
            left: -inner / 2,
          }}
        />
        <View
          style={{
            width: inner * 0.6,
            height: inner * 0.6,
            backgroundColor: edgex.teal,
            borderRadius: 1,
            position: "absolute",
            bottom: -inner * 0.3,
            right: -inner * 0.3,
          }}
        />
      </View>

      {showWordmark ? (
        <Text
          text="EDGEX"
          style={{
            fontFamily: typography.primary.bold,
            color: edgex.text,
            fontSize: size * 0.78,
            letterSpacing: 3,
            marginLeft: size * 0.5,
          }}
        />
      ) : null}
    </View>
  )
}
