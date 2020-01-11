import React from "react"
import { graphql } from "gatsby"

import Bio from "./bio"

class Hero extends React.Component {
  render() {
    const { data } = this.props
    return (
      <div style={{ background: `rgb(21, 88, 112)` }}>
        <Bio></Bio>
      </div>
    )
  }
}

export default Hero
