import { useRef } from "react"
import { Animated, Pressable, ViewStyle } from "react-native"

export interface EdgexPressableScaleProps {
  onPress?: () => void
  style?: ViewStyle
  children: React.ReactNode
}

/** Wraps children in a Pressable that scales down slightly on press — small tactile feedback so cards/links feel alive rather than static. */
export function EdgexPressableScale({ onPress, style, children }: EdgexPressableScaleProps) {
  const scale = useRef(new Animated.Value(1)).current

  const animateTo = (value: number) =>
    Animated.spring(scale, { toValue: value, useNativeDriver: true, speed: 40, bounciness: 4 }).start()

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animateTo(0.97)}
      onPressOut={() => animateTo(1)}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
    </Pressable>
  )
}
