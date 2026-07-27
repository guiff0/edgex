/**
 * EDGEX brand palette. Deliberately distinct from Quantom Inc.'s reactor
 * theme: EDGEX reads as enterprise SaaS — graphite/ink surfaces with an
 * electric "signal" blue as the primary accent and a cooler teal as
 * secondary, rather than the warm reactor-glow amber used on Quantom.
 */
export const edgex = {
  ink: "#0A0D12",
  surface: "#12161D",
  surfaceRaised: "#171C24",
  signal: "#3E8EFF",
  teal: "#2BD9C9",
  amber: "#F2B84B",
  text: "#D7DEE8",
  textDim: "#8B95A3",
  hairline: "#232A35",
  steel: "#3A4452",
  danger: "#FF6B6B",
  success: "#37D67A",
}

export type EdgexPalette = typeof edgex
