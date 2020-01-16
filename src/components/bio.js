/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import colors from "../colors"
import { rhythm } from "../utils/typography"
import LinkedIn from "../../content/assets/icons/linkedin.svg"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile500x752.jpeg/" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            src
            srcSet
            originalImg
            originalName
            aspectRatio
            sizes
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            linkedin
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
        boxShadow: `0px 0px 20px 0px`,
      }}
    >
      <Image
        fluid={data.avatar.childImageSharp.fluid}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: `100px`,
          width: `40vw`,
          height: `100vh`,
        }}
        imgStyle={{}}
      />
      <div
        style={{
          display: `flex`,
          maxWidth: `60vw`,
          flexDirection: `column`,
          padding: `1em`,
          fontWeight: 300,
          color: colors.h2,
          textAlign: `right`,
        }}
      >
        <h2>
          Frontend Engineer in NYC. Managing where Art, Science & Craft meet.
          {` `}
        </h2>
        <p>I like graphs whether map, line, or planar embedding.</p>
        <span>
          {" "}
          <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
            <LinkedIn
              style={{
                width: `2em`,
                height: `2em`,
                fill: colors.h2,
              }}
            />
          </a>
        </span>
      </div>
    </div>
  )
}

export default Bio
