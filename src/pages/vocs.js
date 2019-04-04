import React from "react"
import { graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import AuthorLinks from "../components/AuthorLinks"

export default ({ data }) => {
  // console.log(data)

  return (
    <Layout>
      <Helmet>
        <title>VOCs | {config.siteTitle}</title>
      </Helmet>
      <div>
        <h1>VOCs</h1>

        <p>VOCs are the sounds that you hear in the background, the sound of a blaster or detonator, a door opening, or somebody talking. In short any sound you hear in Dark Forces is a VOC file(except for the MIDI music). Here you can find some files of new sounds created for use in Dark Forces levels.</p>

        <p>The files below are available for download and use in custom levels or your own Dark Forces gaming. Please respect the author's property and follow any guidelines included in attached text files.</p>
        <ul>
          {data.vocs.edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <a href={ withPrefix(`/vocs/${node.frontmatter.filename}`) } className="download">
                  {node.frontmatter.title}
                </a>
                <p><AuthorLinks node={node} /></p>
                <figure>
                    <audio src={node.frontmatter.preview.publicURL} controls>
                        Your browser doesn't support the <code>audio</code> element.
                    </audio>
                    <figcaption>{node.frontmatter.description}</figcaption>
                </figure>
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
    vocs:allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/\/vocs\/.*\/index/" }}
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
            preview {
              publicURL
            }
            authors
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