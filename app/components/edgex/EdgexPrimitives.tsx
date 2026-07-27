import { ReactNode } from "react"
import { Platform, TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { edgex } from "@/theme/edgexPalette"

export const edgexMono: TextStyle = {
  fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "Courier New" }),
}

export function EdgexSection({
  title,
  kicker,
  spacing,
  titleFontFamily,
  children,
}: {
  title: string
  kicker?: string
  spacing: number
  titleFontFamily: string
  children: ReactNode
}) {
  return (
    <View style={{ paddingHorizontal: spacing }}>
      {kicker ? (
        <Text text={kicker} style={[edgexMono, { color: edgex.signal, letterSpacing: 2, marginBottom: 6 }]} />
      ) : null}
      <Text
        text={title}
        style={{ fontFamily: titleFontFamily, color: edgex.text, fontSize: 24, marginBottom: spacing }}
      />
      {children}
    </View>
  )
}

export function EdgexDivider({ label, spacing }: { label: string; spacing: number }) {
  const $row: ViewStyle = { flexDirection: "row" }
  return (
    <View style={[$row, { alignItems: "center", paddingHorizontal: spacing, marginVertical: spacing }]}>
      <View style={{ flex: 1, height: 1, backgroundColor: edgex.hairline }} />
      <Text
        text={label}
        style={[edgexMono, { color: edgex.steel, fontSize: 11, letterSpacing: 3, marginHorizontal: 12 }]}
      />
      <View style={{ flex: 1, height: 1, backgroundColor: edgex.hairline }} />
    </View>
  )
}

export function EdgexListRow({ text, dotColor, spacing }: { text: string; dotColor: string; spacing: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: spacing }}>
      <View
        style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor, marginTop: 8, marginRight: spacing }}
      />
      <Text text={text} style={{ flex: 1, color: edgex.textDim, fontSize: 15, lineHeight: 22 }} />
    </View>
  )
}

export function EdgexCard({
  title,
  body,
  accentColor,
  spacing,
  titleFontFamily,
  style,
}: {
  title: string
  body: string
  accentColor: string
  spacing: number
  titleFontFamily: string
  style?: ViewStyle
}) {
  return (
    <View
      style={[
        {
          flexGrow: 1,
          flexBasis: "30%",
          minWidth: 240,
          backgroundColor: edgex.surface,
          borderWidth: 1,
          borderColor: edgex.hairline,
          borderRadius: 10,
          padding: spacing,
        },
        style,
      ]}
    >
      <Text
        text={title}
        style={{ fontFamily: titleFontFamily, color: accentColor, fontSize: 15, marginBottom: body ? 6 : 0 }}
      />
      {body ? <Text text={body} style={{ color: edgex.textDim, fontSize: 13.5, lineHeight: 20 }} /> : null}
    </View>
  )
}

export function EdgexChip({ label, fontFamily, outline }: { label: string; fontFamily: string; outline?: boolean }) {
  return (
    <View
      style={{
        backgroundColor: outline ? "transparent" : edgex.surfaceRaised,
        borderWidth: outline ? 1 : 0,
        borderColor: edgex.steel,
        borderRadius: 999,
        paddingVertical: 8,
        paddingHorizontal: 14,
      }}
    >
      <Text text={label} style={{ fontFamily, color: edgex.text, fontSize: 13 }} />
    </View>
  )
}

export function EdgexPrimaryButton({
  text,
  onPress,
  fontFamily,
  style,
  disabled,
}: {
  text: string
  onPress: () => void
  fontFamily: string
  style?: ViewStyle
  disabled?: boolean
}) {
  return (
    <Text
      text={text}
      onPress={disabled ? undefined : onPress}
      style={[
        {
          alignSelf: "flex-start",
          backgroundColor: disabled ? edgex.steel : edgex.signal,
          color: disabled ? edgex.textDim : edgex.ink,
          fontFamily,
          fontSize: 14,
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 20,
          overflow: "hidden",
        },
        style,
      ]}
    />
  )
}
