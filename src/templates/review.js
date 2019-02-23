import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Rating from "../components/Rating"

export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <h1>{ post.frontmatter.title }</h1>
            Author: { post.frontmatter.author }
            Reviewed by: { post.frontmatter.reviewer }
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
        title,
        author,
        reviewer,
        rating
      }
    }
  }
`