import Typography from "typography"
import moraga from "typography-theme-moraga"
import * as colors from "../colors.json"

moraga.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "h1,h2": {
      color: colors.h1,
    },
  }
}

const typography = new Typography(moraga)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
