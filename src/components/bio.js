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
      }}
    >
      <Image
        fluid={data.avatar.childImageSharp.fluid}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 500,
        }}
        imgStyle={{}}
      />
      <h2
        style={{
          color: colors.h2,
          fontWeight: 300,
        }}
      >
        Frontend Smith in NYC. Managing where Art, Science & Craft meet.
        {` `}
        <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
          Plug something
        </a>
      </h2>
    </div>
  )
}

export default Bio
