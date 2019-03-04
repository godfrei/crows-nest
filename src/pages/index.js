import React from "react"
import { Link, graphql } from "gatsby"
import BodyClassName from "react-body-classname"
import crow from "../images/crow.png"

export default ({ data }) => {
  console.log(data)
  return (
    <BodyClassName className="home">
      <main>
        <header id="homepage_header">
          <img src={crow} alt="The Moldy Crow" id="crow" />
          <h1 className="gradient-glow" data-text="The Crow's Nest">The Crow's Nest</h1>
        </header>

        <p>Welcome to the Crow's Nest, the most complete and up-to-date site on the web for reviews and downloads of add-on levels for the LucasArts 3D first-person game Dark Forces. If you're a Dark Forces newbie or have never been to the Nest before, you should access the <Link to="/database">Database</Link>. To read a review on a level select it from the <Link to="/reviews">Review List</Link>. You can also download the levels and other files for Dark Forces including patches, FMEs, WAXes and more from <Link to="/storage">Storage</Link>. If you want to find other Dark Forces or Jedi Knight pages, head to the <Link to="/launchpad">Launch Pad</Link> for immediate departure.</p>

        <p>Looking for the <a href="/vintage">vintage Crow's Nest</a>?</p>

        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug }>
                <h3>{node.frontmatter.title}</h3>
                <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}

      </main>
    </BodyClassName>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/posts/" }}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
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