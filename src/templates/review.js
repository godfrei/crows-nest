import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Rating from "../components/Rating"

export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <h1>{ post.frontmatter.mission.frontmatter.title }</h1>
            Author: { post.frontmatter.mission.frontmatter.author }
            <h2>Plot</h2>
            <p>{post.frontmatter.mission.frontmatter.description}</p>
            <h2>Review</h2>
            Reviewed: {post.frontmatter.date} by { post.frontmatter.reviewer }
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Rating score={ post.frontmatter.rating } />
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        reviewer
        rating
        date(formatString: "MMMM Do, YYYY")
        mission {
          frontmatter {
            title
            author
            description
            date(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  }
`