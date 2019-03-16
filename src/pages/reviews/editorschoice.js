import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import config from "../../../data/SiteConfig"
import Layout from "../../components/layout"

export default ({data}) => {
  console.log(data)
  return (
    <Layout>
      <Helmet>
        <title>Editor's Choice | {config.siteTitle}</title>
      </Helmet>
      <h1>Editor's Choice</h1>
      <p>The best of the best.</p>

      <ul>
          {data.levels.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link> - 
                {node.frontmatter.author}
              </li>
            );
          })}
        </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    levels:allMarkdownRemark(
      filter:{
        fileAbsolutePath: { regex: "/\/missions\/.*\/(?!review.*)/"},
        frontmatter: { editorsChoice: { eq: "yes" } }
      }
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