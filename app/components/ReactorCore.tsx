import { useEffect, useRef } from "react"
import { Animated, Easing, StyleSheet, View } from "react-native"

type RingConfig = {
  size: number
  color: string
  duration: number
  delay: number
  maxOpacity: number
}

/**
 * The page's signature element: a quiet, looping "containment pulse" — three
 * rings breathing outward at different rates, like a reactor core viewed
 * through a monitoring dashboard. Pass your accent colors in; everything
 * else on the screen stays still, this is the one place motion lives.
 */
export interface ReactorCoreProps {
  coreColor: string
  ringColors: [string, string, string]
}

export function ReactorCore({ coreColor, ringColors }: ReactorCoreProps) {
  const rings: RingConfig[] = [
    { size: 96, color: ringColors[0], duration: 2600, delay: 0, maxOpacity: 0.9 },
    { size: 168, color: ringColors[1], duration: 3400, delay: 300, maxOpacity: 0.55 },
    { size: 240, color: ringColors[2], duration: 4200, delay: 650, maxOpacity: 0.3 },
  ]

  return (
    <View style={$wrap} pointerEvents="none">
      {rings.map((r) => (
        <Ring key={r.size} {...r} />
      ))}
      <View style={[$core, { backgroundColor: coreColor, shadowColor: coreColor }]} />
    </View>
  )
}

function Ring({ size, color, duration, delay, maxOpacity }: RingConfig) {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [progress, duration, delay])

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] })
  const opacity = progress.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, maxOpacity, 0] })

  return (
    <Animated.View
      style={[
        $ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  )
}

const $wrap = StyleSheet.create({
  wrap: { width: 240, height: 240, alignItems: "center", justifyContent: "center" },
}).wrap

const $ring = StyleSheet.create({
  ring: { position: "absolute", borderWidth: 1.5 },
}).ring

const $core = StyleSheet.create({
  core: {
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
}).core
