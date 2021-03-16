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
          marginBottom: 0,
          minWidth: `100px`,
          flex: `1 1 40vw`,
          width: `40vw`,
          minHeight: `100vh`,
        }}
        imgStyle={{}}
      />
      <div
        style={{
          display: `flex`,
          flex: `1 1 60vw`,
          flexDirection: `column`,
          justifyContent: `space-around`,
          padding: `1em`,
          fontWeight: 300,
          color: colors.h2,
          textAlign: `right`,
        }}
      >
        <h3>
          Frontend Engineer in NYC. Managing where Art, Science & Craft meet.
          {` `}
        </h3>
        <p>I love graphs whether geospatial, linear, or unembeddable.</p>
        <p>
          I've built data discovery systems as well as platforms for push
          content. Looking forward to guiding ever larger scale projects.
        </p>
        <h3>
          Committed to iterative improvement, habitually preparing for the next
          opportunity.
        </h3>
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
