import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
    <Layout>
        <h1>Launch Pad</h1>
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