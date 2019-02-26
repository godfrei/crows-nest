import React from "react"
import { graphql, withPrefix } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Missions</h1>
        <ul>
          {data.allFile.edges.map(({ node }) => (
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
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "missions"}}) {
        edges {
          node {
            name
            prettySize
            relativePath
            publicURL
          }
        }
      }
  }
`