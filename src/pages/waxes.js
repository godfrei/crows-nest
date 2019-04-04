import React from "react"
import { graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import AnimatedSprite from "../components/AnimatedSprite"
import AuthorLinks from "../components/AuthorLinks"

export default ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <Helmet>
        <title>WAXes | {config.siteTitle}</title>
      </Helmet>
      <div>
        <h1>WAXes</h1>

        <p>You know that ferocious Dark Trooper that's looming over you, rushing forward at an incredible pace to speed your journey to the land beyond? You really have nothing to fear because it's just a grouping of 8 flat images with some logic applied; known otherwise as a WAX. All enemies in Dark Forces are WAXes with the exception of the welders, mousebots and turrets which are 3DOs. Waxes also include moving textures or other stationary objects that have different views as you move around them to give you the sensation that you're actually walking around an object.</p>

        <p>The files below are available for download and use in custom levels or your own Dark Forces gaming. Please respect the author's property and follow any guidelines included in attached text files.</p>
        <ul>
          {data.waxes.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <a href={ withPrefix(`/waxs/${node.frontmatter.filename}`) } className="download">
                  <AnimatedSprite spritePath={node.frontmatter.heroImage.publicURL} width={node.frontmatter.width} height={node.frontmatter.height} scale={2} />
                  {node.frontmatter.title}
                </a>
                <p><AuthorLinks node={node} /></p>
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
    waxes:allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/\/waxes\/.*\/index/" }}
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
            width
            height
            filename
          }
          fields {
              slug
          }
        }
      }
    }
  }
`