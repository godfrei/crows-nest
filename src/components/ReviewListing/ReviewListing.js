import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReviewCard from '../ReviewCard'

const ReviewListing = ({ reviewEdges }) => {
    const data = useStaticQuery(graphql`
    query ReviewQuery {
        allMarkdownRemark(
          limit: 4
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            # Only from the missions collection
            fields: {collection: {eq: "missions"}},
            # Only files that include "review" in their file path
            fileAbsolutePath: { regex: "/missions\/.*\/review/" }
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
                reviewers
                rating
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
                  <li><ReviewCard review={review} /></li>
              )
          })
      }
    </ul>
  )
}

export default ReviewListing
