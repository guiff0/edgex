import { ReactNode, useState } from "react"
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
        <EdgexHeader onMenuPress={() => setOpen(true)} onNavigate={onNavigate} currentRoute={currentRoute} />
        {children}
        <EdgexFooter onNavigate={onNavigate} />
      </Screen>
    </Drawer>
  )
}
