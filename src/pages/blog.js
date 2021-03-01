import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

const posts = ({ data }) => (
  <Layout>
    <main>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <SEO />
      <h1>Blog</h1>

      <PostListing postEdges={data.allMarkdownRemark.edges} />
    </main>
  </Layout>
)

export default posts

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: {fields: {collection: {eq: "posts"}}}
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          frontmatter {
            title
            cover {
              name
              publicURL
            }
            date
          }
        }
      }
    }
  }
`