import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"

export default ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <Helmet>
        <title>3DOs | {config.siteTitle}</title>
      </Helmet>
      <div>
        <h1>3DOs</h1>

        <p>3DOs are the 3D objects used in Dark Forces. By 3D objects I'm referring to any ships, bridges, or shapes you see that use curves or angled surfaces. The Dark Forces engine isn't capable of rendering such objects so the authors used a sneaky trick and incorporated the X-Wing engine into the game to simulate these(at least I read that somewhere; can somebody confirm?). You don't truly interact with the objects; for instance if a VUE moves an object and it runs into you, you aren't pushed along, you simply pass through the object. You might also notice that the 3DOs seen in some levels pass through walls, or the authors often allow you to walk through a ship sitting on the ground. Easily the most inventive use of the 3DOs is used to make a bridge. If used properly and imaginatively 3DOs provide a very useful tool and can add a lot to a Dark Forces Add-On.</p>

        <p>The files below are available for download and use in custom levels or your own Dark Forces gaming. Please respect the author's property and follow any guidelines included in attached text files.</p>
        <ul>
          {data.three_dos.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                <p>{node.frontmatter.authors.toString()}</p>
                <p>{node.frontmatter.description}</p>
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
    three_dos:allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/\/3dos\/.*\/index/" }}
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
            authors
          }
          fields {
              slug
          }
        }
      }
    }
  }
`