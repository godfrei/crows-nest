import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)

  function getReviewInfo(node) {
    if (node.frontmatter.mission_id && node.frontmatter.mission_id.frontmatter.rating) {
      return ( <strong>{node.frontmatter.mission_id.frontmatter.rating}</strong>)
    }
    return null;
  }

  return (
    <Layout>
      <div>
        <h1>Missions</h1>
        <ul>
          {data.levels.edges.map(({ node }) => {
            const review_info = getReviewInfo(node);
            return (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                {review_info}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    levels:allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/\/missions\/.*\/(?!review.*)/" }}
      sort: {
        fields: frontmatter___title
        order:ASC
      }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            author
            mission_id {
              frontmatter {
                rating
              }
            }
          }
          fields {
              slug
          }
          excerpt
        }
      }
    }
  }
`