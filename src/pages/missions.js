import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import MissionCard from "../components/MissionCard"

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
      <Helmet>
        <title>Missions | {config.siteTitle}</title>
      </Helmet>
      <div>
        <h1>Missions</h1>
        <ul className="mission-list">
          {data.levels.edges.map(({ node }) => {
            // const review_info = getReviewInfo(node);
            return (
              <li key={node.id}>
                <MissionCard node={node} />
                {/* <Link to={node.fields.slug}>{node.frontmatter.title}</Link> */}
                {/* {review_info} */}
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
            heroImage {
              publicURL
            }
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