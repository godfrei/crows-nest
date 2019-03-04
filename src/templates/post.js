import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
    const post = data.markdownRemark
    return (
      <Layout>
        <h1>{ post.frontmatter.title }</h1>
        Posted: {post.frontmatter.date} by { post.frontmatter.author }
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
        author
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`