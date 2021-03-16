import Typography from "typography"
import moraga from "typography-theme-moraga"
import * as colors from "../colors.json"

moraga.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "h1,h2,a": {
      color: colors.h1,
    },
    h3: {
      color: colors.h2,
    },
    blockquote: {
      background: colors.h1,
      color: colors.h2
    },
    pre: {
      background: colors.h1,
      color: colors.h2,
      borderLeft: "0.39rem solid hsla(0,0%,0%,0.13)",
      paddingLeft: "0.39rem",
      overflow: "scroll",
    },
    "small,li>a": {
      color: colors.small
    },
    hr: {
      background: colors.small
    }
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
