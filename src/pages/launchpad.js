import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import GradientTitle from "../components/GradientTitle"
import launchPad from "../images/launch_pad.png"

export default ({ data }) => (
  <Layout>
    <Helmet>
      <title>Launch Pad | {config.siteTitle}</title>
    </Helmet>
    <img src={launchPad} alt="" className="section_icon" />
    <GradientTitle title="Launch Pad" />
    <p>Links to come</p>
  </Layout>
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