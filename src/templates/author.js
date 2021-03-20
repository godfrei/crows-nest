import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import MissionListing from '../components/MissionListing'
import config from '../../data/SiteConfig'

const AuthorTemplate = ({ data, pageContext }) => (
  <Layout>
    <Helmet title={` "${pageContext.author}" - ${config.siteTitle}`} />
    <h1>{`Author: ${pageContext.author}`}</h1>
    <MissionListing missionEdges={data.allMarkdownRemark.edges} />
  </Layout>
)

export default AuthorTemplate

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { authors: { in: [$author] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          frontmatter {
            title
            description
            cover {
              name
              publicURL
            }
            date
            authors
          }
        }
      }
    }
  }
`
