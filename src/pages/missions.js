import React from "react"
import { graphql, withPrefix, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Missions</h1>
        <ul>
          {/* {data.allFile.edges.map(({ node }) => (
            <li key={node.id}>
              <a href={ withPrefix(`/missions/${node.relativePath}`) }>
                <h3>
                  {node.name}{" "}
                  <span>
                      ({node.prettySize})
                  </span>
                </h3>
              </a>
            </li>
          ))} */}
          {data.levels.edges.map(({ node }) => {
            const folders = node.fields.slug.split('/');
            const mission_title = folders[2]; // Structure is "/levels/*mission_title*/info/"
            return (
              <li key={node.id}>
                <a href={ withPrefix(`/missions/${mission_title}.zip`) }>{node.frontmatter.title}</a>
                <Link to={node.frontmatter.mission_id.fields.slug}>Review ({node.frontmatter.mission_id.frontmatter.rating})</Link>
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
    levels:allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/info/" }}) {
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
              fields {
                slug
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

// export const query = graphql`
//   query {
//     allFile(filter: {sourceInstanceName: {eq: "missions"}}) {
//         edges {
//           node {
//             name
//             prettySize
//             relativePath
//             publicURL
//           }
//         }
//       }
//   }
// `