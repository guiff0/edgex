import { Image, ImageStyle, StyleProp } from "react-native"

export interface EdgexLogoImageProps {
  size?: number
  style?: StyleProp<ImageStyle>
}

/**
 * The full illustrated EDGEX/ALGU Co. logo artwork. Used prominently (hero,
 * login/signup) where its detail reads well. The small header/drawer/footer
 * chrome keeps using the simpler vector `EdgexLogo` mark instead — the
 * illustrated version is too detailed to stay crisp at 20px.
 */
export function EdgexLogoImage({ size = 160, style }: EdgexLogoImageProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    <Image
      source={require("../../../assets/images/edgex-logo.png")}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
      accessibilityLabel="EDGEX, an ALGU Co. company, logo"
    />
  )
}
