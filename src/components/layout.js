import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

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
            paddingTop: `40vh`,
            display: `flex`,
            justifyContent: `space-between`,
          }}
        >
          <h1
            style={{
              ...scale(1.5),
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
          <article
            key={post.fields.slug}
            style={{
              padding: `1em`,
              paddingBottom: `0`,
              flex: `0 1 33%`,
            }}
          >
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
              </h3>
              <small>{post.frontmatter.date}</small>
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
