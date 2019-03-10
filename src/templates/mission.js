import React from "react"
import { graphql, withPrefix } from "gatsby"
import Layout from "../components/layout"
import Review from "../components/Review"
import TechSpecs from "../components/TechSpecs"

export default ({ pageContext, data }) => {
  console.log(data)

  function getReviewContent(reviews) {
    let reviewContent = null
    if(reviews.length >= 1) {
      reviewContent = (
        <div>
          <h2>Review</h2>
          {reviews.map(({ node }) => {
            return (
              <Review key={node.id} node={node} />
            )
          })}
        </div>
      )
    }
    return reviewContent
  }

  const post = data.markdownRemark
  const reviews = (data.allMarkdownRemark) ? data.allMarkdownRemark.edges : []
  return (
    <Layout>
      <h1>{ post.frontmatter.title }</h1>
      Author: { post.frontmatter.author }
      <h2>Plot</h2>
      <p>{post.frontmatter.description}</p>
      {getReviewContent(reviews)}
      <TechSpecs node={post} />
      <a href={ withPrefix(`/missions/${post.frontmatter.filename}`) }>Download {post.frontmatter.title} ({post.frontmatter.filename}, {data.file.prettySize}) </a>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $reviewRegex: String!, $filename: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        description
        date(formatString: "MMMM Do, YYYY")
        filename
        levelReplaced
        difficulty
        bm
        fme
        wax
        three_do
        voc
        gmd
        vue
        lfd
        base
        editors
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { 
        fields: { slug: { regex: $reviewRegex } }
      }
      sort: {
        fields: frontmatter___date
        order:ASC
      }
    ) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            reviewer
            rating
            date(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
    file(relativePath: { eq: $filename }) {
      absolutePath
      prettySize
    }
  }
`