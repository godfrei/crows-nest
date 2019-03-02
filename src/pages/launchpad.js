import React from "react"
import { graphql } from "gatsby"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import launchPad from "../images/launch_pad.png"

export default ({ data }) => (
  <BodyClassName className="launchpad">
    <Layout>
        <img src={launchPad} alt="" className="section_icon" />
        <h1 className="gradient-glow" data-text="Launch Pad">Launch Pad</h1>
        <p>Links to come</p>
    </Layout>
  </BodyClassName>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`