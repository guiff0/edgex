import { Linking, View } from "react-native"

import { Text } from "@/components/Text"
import { FOOTER } from "@/content/edgexContent"
import { useAppTheme } from "@/theme/context"
import { edgex } from "@/theme/edgexPalette"

import { EdgexLogo } from "./EdgexLogo"

export interface EdgexFooterProps {
  onNavigate: (route: string) => void
}

export function EdgexFooter({ onNavigate }: EdgexFooterProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: edgex.hairline,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.xl,
        marginTop: spacing.xl,
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }}>
        {FOOTER.columns.map((column) => (
          <View key={column.heading} style={{ minWidth: 160, flexGrow: 1, flexBasis: "20%" }}>
            <Text
              text={column.heading}
              style={{
                fontFamily: typography.primary.medium,
                color: edgex.text,
                fontSize: 13,
                marginBottom: spacing.sm,
              }}
            />
            {column.items.map((item) => (
              <Text
                key={item.label}
                text={item.label}
                onPress={item.route ? () => onNavigate(item.route as string) : undefined}
                style={{
                  color: item.route ? edgex.textDim : edgex.steel,
                  fontSize: 12.5,
                  lineHeight: 20,
                  marginBottom: 4,
                }}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={{ height: 1, backgroundColor: edgex.hairline, marginVertical: spacing.lg }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <EdgexLogo size={16} showWordmark={false} />
          <Text
            text="ALGU Co. (DBA EDGEX)"
            style={{ fontFamily: typography.primary.medium, color: edgex.textDim, fontSize: 12 }}
          />
        </View>
        <Text
          text={FOOTER.contactEmail}
          onPress={() => Linking.openURL(`mailto:${FOOTER.contactEmail}`)}
          style={{ color: edgex.signal, fontSize: 12 }}
        />
      </View>
    </View>
  )
}
