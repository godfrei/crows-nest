import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext, data }) => {
  const { author } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const authorHeader = `${totalCount} mission${
    totalCount === 1 ? "" : "s"
  } created by "${author}"`

  return (
    <Layout>
      <h1>{authorHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
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
          }
        }
      }
    }
  }
`