import React from "react"
import { graphql } from "gatsby"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import GradientTitle from "../components/GradientTitle"
import launchPad from "../images/launch_pad.png"

export default ({ data }) => (
  <BodyClassName className="launchpad">
    <Layout>
        <img src={launchPad} alt="" className="section_icon" />
        <GradientTitle title="Launch Pad" />
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