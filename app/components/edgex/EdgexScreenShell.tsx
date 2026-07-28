import { ReactNode, useState } from "react"
import { Platform, View, ViewStyle } from "react-native"
import { Drawer } from "react-native-drawer-layout"

import { Screen } from "@/components/Screen"
import { edgex } from "@/theme/edgexPalette"

import { EdgexDrawerContent } from "./EdgexDrawerContent"
import { EdgexFooter } from "./EdgexFooter"
import { EdgexHeader } from "./EdgexHeader"

export interface EdgexScreenShellProps {
  currentRoute: string
  onNavigate: (route: string) => void
  children: ReactNode
  contentContainerStyle?: object
}

// Sticky header for web (a standard corporate-site pattern). Native
// ScrollView doesn't support CSS position:"sticky" the way react-native-web
// does, so this only applies on web — native keeps the ordinary
// scrolls-away-with-content header, which is the expected mobile pattern.
const stickyHeaderWrapperStyle: ViewStyle =
  Platform.OS === "web"
    ? ({ position: "sticky" as never, top: 0, zIndex: 20, backgroundColor: edgex.ink } as ViewStyle)
    : {}

export function EdgexScreenShell({
  currentRoute,
  onNavigate,
  children,
  contentContainerStyle,
}: EdgexScreenShellProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="front"
      drawerStyle={{ width: 300, backgroundColor: edgex.surface }}
      renderDrawerContent={() => (
        <EdgexDrawerContent onNavigate={onNavigate} onClose={() => setOpen(false)} />
      )}
    >
      <Screen
        preset="scroll"
        backgroundColor={edgex.ink}
        systemBarStyle="light"
        contentContainerStyle={contentContainerStyle}
        safeAreaEdges={["top"]}
      >
        <View style={stickyHeaderWrapperStyle}>
          <EdgexHeader onMenuPress={() => setOpen(true)} onNavigate={onNavigate} currentRoute={currentRoute} />
        </View>
        {children}
        <EdgexFooter onNavigate={onNavigate} />
      </Screen>
    </Drawer>
  )
}
