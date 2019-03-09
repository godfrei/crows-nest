import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Rating from "../components/Rating"

export default ({ data }) => {
  console.log(data)
  const post = data.markdownRemark
  const review = post.frontmatter.mission_id
  return (
    <Layout>
      <h1>{ post.frontmatter.title }</h1>
      Author: { post.frontmatter.author }
      <h2>Plot</h2>
      <p>{post.frontmatter.description}</p>
      <h2>Review</h2>
      Reviewed: {review.frontmatter.date} by { review.frontmatter.reviewer }
      <div dangerouslySetInnerHTML={{ __html: review.html }} />
      <Rating score={ review.frontmatter.rating } />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        description
        date(formatString: "MMMM Do, YYYY")
        mission_id {
          html
          frontmatter {
            reviewer
            rating
            date(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  }
`