import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import colors from "../colors"

class Layout extends React.Component {
  render() {
    const { location, title, children, post } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div
          style={{
            height: `100vh`,
            display: `flex`,
            justifyContent: `space-between`,
            flexFlow: `row wrap`,
          }}
        >
          <div
            style={{
              paddingTop: `20%`,
              flex: `1 0 60%`,
            }}
          >
            <h1
              style={{
                ...scale(1.75),
                padding: rhythm(1 / 4),
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
          </div>
          <article
            key={post.fields.slug}
            style={{
              padding: `1em`,
              paddingTop: `10%`,
              flex: `1 2 40%`,
            }}
          >
            <small style={{ color: `#ff5847` }}>
              Latest - {post.frontmatter.date}
            </small>
            <header>
              <h3
                style={{
                  ...scale(0.5),
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </section>
          </article>
        </div>
      )
    } else {
      header = (
        <>
          <h3
            style={{
              fontFamily: `Montserrat, sans-serif`,
              padding: rhythm(1 / 4),
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
        </>
      )
    }
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom right, #FF6F61, yellow)`,
          minHeight: `100vh`,
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
