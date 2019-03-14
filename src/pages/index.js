import React from "react"
import { Link, graphql } from "gatsby"
import BodyClassName from "react-body-classname"
import Navigation from "../components/Navigation"
import GradientTitle from "../components/GradientTitle"
import crow from "../images/crow.png"
import Footer from "../components/Footer";

export default ({ data }) => {
  console.log(data)
  return (
    <BodyClassName className="home">
      <main>
        <header id="homepage_header">
          <img src={crow} alt="The Moldy Crow" id="crow" />
          <GradientTitle title="The Crow's Nest" />
          <Navigation />
        </header>

        <div className="content">

          <p>Welcome to the Crow's Nest, the most complete and up-to-date site on the web for reviews and downloads of add-on levels for the LucasArts 3D first-person game Dark Forces. If you're a Dark Forces newbie or have never been to the Nest before, you should access the <Link to="/database">Database</Link>. To read a review on a level select it from the <Link to="/reviews">Review List</Link>. You can also download the levels and other files for Dark Forces including patches, FMEs, WAXes and more from <Link to="/storage">Storage</Link>. If you want to find other Dark Forces or Jedi Knight pages, head to the <Link to="/launchpad">Launch Pad</Link> for immediate departure.</p>

          <p>Looking for the <a href="/vintage">vintage Crow's Nest</a>?</p>

          {data.allMarkdownRemark.edges.map(({ node }) => {
            if(node.frontmatter.title) {
              return (
                <div key={node.id}>
                  <Link to={node.fields.slug }>
                      <h3>{node.frontmatter.title}</h3>
                      <p>{node.excerpt}</p>
                  </Link>
                </div>
              )
            }
            else {
              return (
                <div key={node.id}>
                  <Link to={node.fields.slug }>
                      <h3>{node.frontmatter.title}</h3>
                      <p>{node.excerpt}</p>
                  </Link>
                </div>
              )
            }
          })}
        </div>
        <Footer />
      </main>
    </BodyClassName>
  )
}
// filter: { fileAbsolutePath: { regex: "/(missions|posts)\/.*\/(?:review)?.*/" }}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(\/missions\/.*\/review.*)|(\/posts\/.*\/)/" }}
      limit:5
      sort: {
        fields: frontmatter___date
        order:DESC
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            author
            date(formatString: "MMMM Do, YYYY")
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