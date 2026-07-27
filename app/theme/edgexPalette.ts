/**
 * EDGEX brand palette — metallic silver + blue reactor-core aesthetic,
 * matching the illustrated logo mark. Same keys as before (so nothing
 * downstream needs renaming), values shifted from the earlier flat
 * "enterprise SaaS" look toward brushed-steel surfaces with a cooler,
 * brighter reactor-glow blue as the single dominant accent.
 */
export const edgex = {
  ink: "#0A0C10",
  surface: "#15181D",
  surfaceRaised: "#1B1F25",
  signal: "#5FA8FF", // primary reactor-glow blue
  teal: "#1B5FCF", // deep secondary blue (kept the old key name; no longer teal-green)
  amber: "#D9B24C", // warning/utility only — muted metallic gold, not a brand accent
  text: "#E4E7EC", // bright silver-white
  textDim: "#8A9099", // cool steel gray
  hairline: "#262B31",
  steel: "#3A4048", // brushed steel — borders, outlines, chips
  silverBright: "#F4F6F8", // for emphasis/headline highlight text
  danger: "#FF6B6B",
  success: "#37D67A",
}

export type EdgexPalette = typeof edgex
