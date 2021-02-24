import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../layout"
import SpecNav from "../components/SpecNav"

export default ({ data }) => {
    const post = data.markdownRemark
    return (
      <Layout>
        <Helmet>
          <title>{`${post.frontmatter.title} | DF Specs | ${config.siteTitle}`}</title>
        </Helmet>
        <header>
            <small>Dark Forces Unofficial Specifications v3.2</small>
            <h1>{ post.frontmatter.title }</h1>
        </header>

        <SpecNav />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`