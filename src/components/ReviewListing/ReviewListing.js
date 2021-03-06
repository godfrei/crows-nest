import React from 'react'
import { useStaticQuery } from 'gatsby'

const ReviewListing = ({ reviewEdges }) => {
    const data = useStaticQuery(graphql`
    query ReviewQuery {
        allMarkdownRemark(
          limit: 4
          sort: { fields: [fields___date], order: DESC }
          filter: {
            # Only from the missions collection
            fields: {collection: {eq: "missions"}},
            # Not files that include "review" in their file path
            fileAbsolutePath: { regex: "/missions\/.*\/index/" }
          }
        ) {
          edges {
            node {
              fields {
                slug
                date(formatString: "MMMM DD, YYYY")
              }
              excerpt
              frontmatter {
                title
                cover {
                  name
                  publicURL
                }
                date
              }
            }
          }
        }
      }
    `)

  return (
    <ul className="mission-grid">
      {
          data.allMarkdownRemark.edges.map(review => {
              return (
                  <li>{review.node.fields.slug}</li>
              )
          })
      }
    </ul>
  )
}

export default ReviewListing
