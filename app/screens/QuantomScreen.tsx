import { FC, ReactNode } from "react"
import { Linking, Platform, TextStyle, View, ViewStyle, useWindowDimensions } from "react-native"

import { ReactorCore } from "@/components/ReactorCore"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

/**
 * A fixed dark palette for this screen only. Quantom Inc.'s brand is a
 * control-room black with a cold cyan (superconducting/cryo) and warm amber
 * (reactor glow) accent — deliberately distinct from the app's default
 * light theme palette, since this is a standalone marketing surface.
 */
const QUANTOM = {
  void: "#0B0E14",
  panel: "#12161F",
  panelRaised: "#161B26",
  plasma: "#29F1C3",
  core: "#E8A33D",
  ion: "#7C5CFC",
  fog: "#C7D0DC",
  fogDim: "#8A93A3",
  steel: "#3A4452",
  hairline: "#212836",
}

const CONTACT_EMAIL = "edgex@quantominc.com"

const REACTOR_SPECS = [
  { label: "OUTPUT", value: "20–50 MW / module" },
  { label: "CARBON", value: "Zero, baseload" },
  { label: "LIFESPAN", value: "50+ years" },
  { label: "COOLING FIT", value: "10–20 mK dilution" },
]

const MMR_INTEGRATION = [
  "Quantum data center power distribution",
  "Cryogenic cooling systems (10–20 mK dilution refrigerators)",
  "High-density compute racks",
  "QPU control electronics",
  "Redundant safety and containment systems",
  "Real-time monitoring and automated fail-safe protocols",
]

const QPU_PIPELINE = [
  {
    n: "01",
    title: "Design",
    body: "Superconducting, photonic, trapped-ion, spin, and topological architectures, optimized for coherence, low gate error, scalable connectivity, and manufacturability.",
  },
  {
    n: "02",
    title: "Implementation",
    body: "Cryogenic systems, microwave and RF control electronics, pulse-level firmware, error mitigation and correction, and hybrid quantum-classical orchestration.",
  },
  {
    n: "03",
    title: "Manufacturing",
    body: "Nanofabrication, superconducting material processing, photonic chip manufacturing, ion trap microfabrication, and cryogenic packaging. Every unit ships fully characterized.",
  },
]

const QUBIT_MODALITIES = ["Superconducting", "Photonic", "Trapped-ion", "Spin", "Topological"]

const SERVICES = [
  { title: "Quantum Machine Learning", body: "Quantum kernels, variational circuits, QNNs, and hybrid QML pipelines." },
  { title: "Quantum Optimization", body: "QAOA-based optimization for finance, logistics, manufacturing, and energy." },
  { title: "Quantum Simulation", body: "Molecular modeling, materials science, climate systems, and physics." },
  { title: "Quantum Security", body: "Quantum-resistant cryptography, QKD, and quantum-enhanced threat detection." },
  { title: "Quantum Cloud Integration", body: "Azure Quantum, AWS Braket, IBM Quantum, and hybrid HPC + QPU orchestration." },
  { title: "Quantum Consulting & Strategy", body: "Architecture design, readiness assessments, PoCs, integration roadmaps." },
]

const INDUSTRIES = [
  "Financial Services",
  "Healthcare & Biotech",
  "Cybersecurity",
  "Manufacturing & Logistics",
  "Energy & Climate Science",
  "Government & Defense",
]

const WHY_QUANTOM = [
  "Full-stack quantum engineering: software, hardware, energy, and cloud",
  "Custom QPU design and fabrication",
  "Nuclear-powered quantum data centers",
  "Enterprise-grade security and compliance",
  "Hybrid systems delivering real performance today",
  "End-to-end lifecycle: data → model → QPU → deployment → monitoring",
]

interface QuantomScreenProps extends AppStackScreenProps<"Quantom"> {}

export const QuantomScreen: FC<QuantomScreenProps> = function QuantomScreen(_props) {
  const { themed, theme } = useAppTheme()
  const { spacing, typography } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 860

  const openMail = () => Linking.openURL(`mailto:${CONTACT_EMAIL}`)

  return (
    <Screen
      preset="scroll"
      backgroundColor={QUANTOM.void}
      systemBarStyle="light"
      contentContainerStyle={themed($content)}
    >
      {/* NAV */}
      <View style={[$row, $navRow, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }]}>
        <Text text="QUANTOM" style={[$wordmark, { fontFamily: typography.primary.bold }]} />
        <Text
          text={CONTACT_EMAIL}
          onPress={openMail}
          style={[
            $mono,
            {
              color: QUANTOM.fogDim,
              borderWidth: 1,
              borderColor: QUANTOM.steel,
              borderRadius: 999,
              paddingVertical: 6,
              paddingHorizontal: 14,
              fontSize: 12,
            },
          ]}
        />
      </View>

      {/* HERO */}
      <View
        style={[
          { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.lg },
          isWide && $row,
          isWide && { justifyContent: "space-between", alignItems: "center" },
        ]}
      >
        <View style={{ maxWidth: 560 }}>
          <Text
            text="QPU ENGINEERING · MICRO-REACTOR POWER"
            style={[$mono, { color: QUANTOM.plasma, letterSpacing: 2, marginBottom: spacing.sm }]}
          />
          <Text
            text={"Quantum infrastructure\nthat powers itself."}
            style={[
              { fontFamily: typography.primary.bold, color: QUANTOM.fog, fontSize: 40, lineHeight: 46 },
              { marginBottom: spacing.md },
            ]}
          />
          <Text
            text="Quantom Inc. builds full-stack quantum computing ecosystems — algorithms, QML pipelines, custom-engineered QPUs, and mini nuclear reactor–powered data centers built for ultra-high-density, mission-critical workloads."
            style={{ color: QUANTOM.fogDim, fontSize: 16, lineHeight: 24, marginBottom: spacing.lg }}
          />
          <Text
            text="Talk to the team →"
            onPress={openMail}
            style={{
              alignSelf: "flex-start",
              backgroundColor: QUANTOM.plasma,
              color: QUANTOM.void,
              fontFamily: typography.primary.medium,
              fontSize: 14,
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 20,
              overflow: "hidden",
            }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: isWide ? 0 : spacing.lg }}>
          <ReactorCore coreColor={QUANTOM.core} ringColors={[QUANTOM.core, QUANTOM.plasma, QUANTOM.ion]} />
        </View>
      </View>

      <Divider label="POWER" spacing={spacing.lg} />

      {/* NUCLEAR DATA CENTERS */}
      <Section
        title="Mini nuclear reactor–powered data centers"
        kicker="CLEAN ENERGY · HIGH RELIABILITY · EXTREME DENSITY"
        spacing={spacing.lg}
        titleFontFamily={typography.primary.bold}
      >
        <Text
          text="Quantum workloads demand continuous cryogenic cooling, ultra-stable power with zero interruption, and long-term scalability that the grid alone can't guarantee. Quantom Inc. develops micro-modular reactors (MMRs) engineered specifically for on-site data-center integration — enabling autonomous quantum campuses that run QPUs, HPC clusters, and AI systems independent of external grids."
          style={{ color: QUANTOM.fogDim, fontSize: 15, lineHeight: 23, marginBottom: spacing.md }}
        />

        <View style={[$row, { flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.xs }]}>
          {REACTOR_SPECS.map((s) => (
            <View
              key={s.label}
              style={{
                flexGrow: 1,
                flexBasis: "45%",
                backgroundColor: QUANTOM.panel,
                borderWidth: 1,
                borderColor: QUANTOM.hairline,
                borderRadius: 10,
                padding: spacing.md,
              }}
            >
              <Text text={s.value} style={[$mono, { color: QUANTOM.plasma, fontSize: 17, marginBottom: 4 }]} />
              <Text text={s.label} style={[$mono, { color: QUANTOM.fogDim, fontSize: 11, letterSpacing: 1.5 }]} />
            </View>
          ))}
        </View>

        <Text
          text="MMR engineering & integration"
          style={{
            fontFamily: typography.primary.medium,
            color: QUANTOM.fog,
            fontSize: 15,
            marginTop: spacing.lg,
            marginBottom: spacing.sm,
          }}
        />
        {MMR_INTEGRATION.map((item) => (
          <ListRow key={item} text={item} dotColor={QUANTOM.plasma} spacing={spacing.sm} />
        ))}

        <Text
          text="Nuclear engineering partners provide NRC-compliant reactor cores, shielding, and safety systems. Quantom Inc. handles compute-side integration and quantum facility architecture."
          style={{
            color: QUANTOM.steel,
            fontSize: 13,
            lineHeight: 20,
            marginTop: spacing.md,
            fontStyle: "italic",
          }}
        />
      </Section>

      <Divider label="HARDWARE" spacing={spacing.lg} />

      {/* QPU PIPELINE */}
      <Section title="QPU design, implementation & manufacturing" kicker="FROM ARCHITECTURE TO SHIPPED HARDWARE" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={[$row, { flexWrap: "wrap", gap: spacing.xs }]}>
          {QUBIT_MODALITIES.map((q) => (
            <View
              key={q}
              style={{
                backgroundColor: QUANTOM.panelRaised,
                borderRadius: 999,
                paddingVertical: 8,
                paddingHorizontal: 14,
              }}
            >
              <Text text={q} style={{ fontFamily: typography.primary.medium, color: QUANTOM.fog, fontSize: 13 }} />
            </View>
          ))}
        </View>

        <View style={{ height: spacing.md }} />

        {QPU_PIPELINE.map((step, i) => (
          <View
            key={step.n}
            style={{
              flexDirection: "row",
              paddingVertical: spacing.md,
              borderBottomWidth: i === QPU_PIPELINE.length - 1 ? 0 : 1,
              borderBottomColor: QUANTOM.hairline,
            }}
          >
            <Text text={step.n} style={[$mono, { color: QUANTOM.core, fontSize: 22, width: 56 }]} />
            <View style={{ flex: 1 }}>
              <Text
                text={step.title}
                style={{ fontFamily: typography.primary.medium, color: QUANTOM.fog, fontSize: 17, marginBottom: 4 }}
              />
              <Text text={step.body} style={{ color: QUANTOM.fogDim, fontSize: 14, lineHeight: 21 }} />
            </View>
          </View>
        ))}
      </Section>

      <Divider label="SERVICES" spacing={spacing.lg} />

      {/* SERVICES */}
      <Section title="Quantum services" kicker="WHAT WE RUN FOR CLIENTS" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={[$row, { flexWrap: "wrap", gap: spacing.sm }]}>
          {SERVICES.map((s) => (
            <View
              key={s.title}
              style={{
                flexGrow: 1,
                flexBasis: "30%",
                minWidth: 240,
                backgroundColor: QUANTOM.panel,
                borderWidth: 1,
                borderColor: QUANTOM.hairline,
                borderRadius: 10,
                padding: spacing.md,
              }}
            >
              <Text
                text={s.title}
                style={{ fontFamily: typography.primary.medium, color: QUANTOM.ion, fontSize: 15, marginBottom: 6 }}
              />
              <Text text={s.body} style={{ color: QUANTOM.fogDim, fontSize: 13.5, lineHeight: 20 }} />
            </View>
          ))}
        </View>
      </Section>

      <Divider label="INDUSTRIES" spacing={spacing.lg} />

      {/* INDUSTRIES */}
      <Section title="Industries we serve" spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        <View style={[$row, { flexWrap: "wrap", gap: spacing.xs }]}>
          {INDUSTRIES.map((ind) => (
            <View
              key={ind}
              style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: QUANTOM.steel,
                borderRadius: 999,
                paddingVertical: 8,
                paddingHorizontal: 14,
              }}
            >
              <Text text={ind} style={{ fontFamily: typography.primary.medium, color: QUANTOM.fog, fontSize: 13 }} />
            </View>
          ))}
        </View>
      </Section>

      <Divider label="WHY QUANTOM" spacing={spacing.lg} />

      {/* WHY QUANTOM */}
      <Section title="Why Quantom Inc." spacing={spacing.lg} titleFontFamily={typography.primary.bold}>
        {WHY_QUANTOM.map((item) => (
          <ListRow key={item} text={item} dotColor={QUANTOM.core} spacing={spacing.sm} />
        ))}
      </Section>

      {/* FOOTER */}
      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
        <Text
          text="QUANTOM INC."
          style={{ fontFamily: typography.primary.bold, color: QUANTOM.fog, fontSize: 16, letterSpacing: 3, marginBottom: 6 }}
        />
        <Text text="Full-stack quantum engineering, self-powered." style={{ color: QUANTOM.fogDim, fontSize: 14, marginBottom: spacing.md }} />
        <Text
          text={CONTACT_EMAIL}
          onPress={openMail}
          style={{
            alignSelf: "flex-start",
            backgroundColor: QUANTOM.plasma,
            color: QUANTOM.void,
            fontFamily: typography.primary.medium,
            fontSize: 14,
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 20,
            overflow: "hidden",
            marginBottom: spacing.xxl,
          }}
        />
      </View>
    </Screen>
  )
}

function Section({
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
      {kicker ? <Text text={kicker} style={[$mono, { color: QUANTOM.core, letterSpacing: 2, marginBottom: 6 }]} /> : null}
      <Text text={title} style={{ fontFamily: titleFontFamily, color: QUANTOM.fog, fontSize: 26, marginBottom: spacing }} />
      {children}
    </View>
  )
}

function Divider({ label, spacing }: { label: string; spacing: number }) {
  return (
    <View style={[$row, { alignItems: "center", paddingHorizontal: spacing, marginVertical: spacing }]}>
      <View style={{ flex: 1, height: 1, backgroundColor: QUANTOM.hairline }} />
      <Text text={label} style={[$mono, { color: QUANTOM.steel, fontSize: 11, letterSpacing: 3, marginHorizontal: 12 }]} />
      <View style={{ flex: 1, height: 1, backgroundColor: QUANTOM.hairline }} />
    </View>
  )
}

function ListRow({ text, dotColor, spacing }: { text: string; dotColor: string; spacing: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: spacing }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor, marginTop: 8, marginRight: spacing }} />
      <Text text={text} style={{ flex: 1, color: QUANTOM.fogDim, fontSize: 15, lineHeight: 22 }} />
    </View>
  )
}

const $row: ViewStyle = { flexDirection: "row" }

const $wordmark: TextStyle = { color: QUANTOM.fog, fontSize: 18, letterSpacing: 4 }

const $mono: TextStyle = {
  fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "Courier New" }),
}

const $navRow: ViewStyle = { justifyContent: "space-between", alignItems: "center" }

const $content: ThemedStyle<ViewStyle> = () => ({
  alignItems: "stretch",
})
