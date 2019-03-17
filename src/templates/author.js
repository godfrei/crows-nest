import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import MissionCard from "../components/MissionCard"

export default ({ pageContext, data }) => {
  const { author } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const authorHeader = `${totalCount} mission${
    totalCount === 1 ? "" : "s"
  } created by "${author}"`

  return (
    <Layout>
      <Helmet>
        <title>{`${author} | ${config.siteTitle}`}</title>
      </Helmet>
      <h1>{authorHeader}</h1>
      <ul className="mission-list">
        {edges.map(({ node }) => (
          <li>
            <MissionCard node={node} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($author: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { authors: { in: [$author] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            heroImage {
              publicURL
            }
          }
        }
      }
    }
  }
`