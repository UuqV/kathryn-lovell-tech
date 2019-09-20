import React from "react"
import { Link } from "gatsby"

import Bio from "../components/bio"
import { rhythm, scale } from "../utils/typography"
import * as colors from "../colors.json"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `50% 50%`,
            height: `100vh`,
          }}
        >
          <h1
            style={{
              ...scale(1.5),
              alignSelf: `center`,
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
          <div>
            <h2 style={{ textAlign: `right` }}>Latest</h2>
          </div>
        </div>
      )
    } else {
      header = (
        <>
          <h3
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h3>
          <Bio />
        </>
      )
    }
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom right, #FF6F61, yellow)`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
