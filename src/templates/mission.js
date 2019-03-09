import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Rating from "../components/Rating"

export default ({ pageContext, data }) => {
  console.log(data)
  console.log(pageContext)
  const post = data.markdownRemark
  const reviews = data.allMarkdownRemark.edges
  // const review = post.frontmatter.mission_id
  return (
    <Layout>
      <h1>{ post.frontmatter.title }</h1>
      Author: { post.frontmatter.author }
      <h2>Plot</h2>
      <p>{post.frontmatter.description}</p>
      <h2>Review</h2>
      {reviews.map(({ node }) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        )
      })}
    </Layout>
  )
}

// fileAbsolutePath: { regex: "/missions\/.*\/review.*/" }
// frontmatter: { mission: { in: [$slug] } } 

export const query = graphql`
  query($slug: String!, $reviewRegex: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        description
        date(formatString: "MMMM Do, YYYY")
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { 
        fields: { slug: { regex: $reviewRegex } }
      }
    ) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            reviewer
            rating
            date
          }
        }
      }
    }
  }
`