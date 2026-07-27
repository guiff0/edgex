import { useEffect, useRef } from "react"
import { Animated, Easing, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { edgex } from "@/theme/edgexPalette"

export type EdgexIllustrationVariant =
  | "home"
  | "products"
  | "services"
  | "technologies"
  | "industries"
  | "departments"
  | "about"
  | "careers"
  | "contact"
  | "leadership"
  | "legal"
  | "governance"
  | "documentation"
  | "api"
  | "whitepapers"
  | "caseStudies"
  | "newsroom"

const GLYPHS: Record<EdgexIllustrationVariant, { shape: Shape; color: string }> = {
  home: { shape: "diamond", color: edgex.signal },
  products: { shape: "square", color: edgex.silverBright },
  services: { shape: "circles", color: edgex.signal },
  technologies: { shape: "ring", color: edgex.signal },
  industries: { shape: "ring", color: edgex.teal },
  departments: { shape: "bars", color: edgex.silverBright },
  about: { shape: "diamond", color: edgex.silverBright },
  careers: { shape: "triangle", color: edgex.signal },
  contact: { shape: "dot", color: edgex.signal },
  leadership: { shape: "diamond", color: edgex.silverBright },
  legal: { shape: "square", color: edgex.steel },
  governance: { shape: "ring", color: edgex.signal },
  documentation: { shape: "bars", color: edgex.signal },
  api: { shape: "cross", color: edgex.teal },
  whitepapers: { shape: "square", color: edgex.signal },
  caseStudies: { shape: "circles", color: edgex.teal },
  newsroom: { shape: "dot", color: edgex.teal },
}

type Shape = "diamond" | "square" | "circles" | "ring" | "bars" | "triangle" | "cross" | "dot"

export interface EdgexIllustrationProps {
  variant: EdgexIllustrationVariant
  height?: number
  style?: ViewStyle
}

export function EdgexIllustration({ variant, height = 180, style }: EdgexIllustrationProps) {
  const pulse = useRef(new Animated.Value(0)).current
  const { shape, color } = GLYPHS[variant]

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [pulse])

  const glowScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.08] })
  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.7] })

  return (
    <View style={[{ height, borderRadius: 14, overflow: "hidden" }, style]}>
      <LinearGradient
        colors={[edgex.ink, edgex.surfaceRaised, edgex.steel, edgex.surfaceRaised, edgex.ink]}
        locations={[0, 0.3, 0.5, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {/* brushed-metal sheen streaks */}
        {[0.12, 0.42, 0.7, 0.88].map((pos) => (
          <View
            key={pos}
            style={{
              position: "absolute",
              top: -20,
              bottom: -20,
              left: `${pos * 100}%`,
              width: 1,
              backgroundColor: "rgba(255,255,255,0.06)",
              transform: [{ skewX: "-18deg" }],
            }}
          />
        ))}

        {/* reactor glow */}
        <Animated.View
          style={{
            position: "absolute",
            width: height * 0.85,
            height: height * 0.85,
            borderRadius: 999,
            backgroundColor: color,
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          }}
        />
        <View
          style={{
            width: height * 0.52,
            height: height * 0.52,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: "rgba(228,231,236,0.3)",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(10,12,16,0.35)",
          }}
        >
          <Glyph shape={shape} color={color} size={height * 0.26} />
        </View>
      </LinearGradient>
    </View>
  )
}

function Glyph({ shape, color, size }: { shape: Shape; color: string; size: number }) {
  switch (shape) {
    case "diamond":
      return <View style={{ width: size, height: size, backgroundColor: color, borderRadius: 4, transform: [{ rotate: "45deg" }] }} />
    case "square":
      return <View style={{ width: size, height: size, backgroundColor: color, borderRadius: 6 }} />
    case "circles":
      return (
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: size * 0.65, height: size * 0.65, borderRadius: size * 0.33, backgroundColor: color, marginRight: -size * 0.22 }} />
          <View style={{ width: size * 0.65, height: size * 0.65, borderRadius: size * 0.33, backgroundColor: edgex.silverBright, opacity: 0.75 }} />
        </View>
      )
    case "ring":
      return <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 3, borderColor: color }} />
    case "bars":
      return (
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: size * 0.12 }}>
          {[0.5, 0.85, 0.65].map((h, i) => (
            <View key={i} style={{ width: size * 0.18, height: size * h, backgroundColor: color, borderRadius: 2 }} />
          ))}
        </View>
      )
    case "triangle":
      return (
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: color,
          }}
        />
      )
    case "cross":
      return (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
          <View style={{ position: "absolute", width: size, height: size * 0.22, backgroundColor: color, borderRadius: 2 }} />
          <View style={{ position: "absolute", width: size * 0.22, height: size, backgroundColor: color, borderRadius: 2 }} />
        </View>
      )
    case "dot":
      return <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, backgroundColor: color }} />
  }
}
