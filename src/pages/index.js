import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import BodyClassName from "react-body-classname"
import GradientTitle from '../components/GradientTitle'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import crow from '../images/crow.png'

const Index = ({ data }) => (
  <BodyClassName className="home">
    <>
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <SEO />
      <header id="homepage_header">
        <img src={crow} alt="The Moldy Crow" id="crow" />
        <GradientTitle title={config.siteTitle} />
        <Navigation />
      </header>
      <main>
        <p>Welcome to the Crow's Nest, the most complete and up-to-date site on the web for reviews and downloads of add-on levels for the LucasArts 3D first-person game Dark Forces. If you're a Dark Forces newbie or have never been to the Nest before, you should access the <Link to="/database">Database</Link>. To read a review on a level select it from the <Link to="/reviews">Review List</Link>. You can also download the levels and other files for Dark Forces including patches, FMEs, WAXes and more from <Link to="/storage">Storage</Link>. If you want to find other Dark Forces or Jedi Knight pages, head to the <Link to="/launchpad">Launch Pad</Link> for immediate departure.</p>

        <p>Looking for the <a href="/vintage">vintage Crow's Nest</a>?</p>

        <PostListing postEdges={data.allMarkdownRemark.edges} />
      </main>
      <Footer />
    </>
  </BodyClassName>
  // <Layout>
  //   <main>
  //     <Helmet title={config.siteTitle} />
  //     <SEO />
  //     <PostListing postEdges={data.allMarkdownRemark.edges} />
  //   </main>
  // </Layout>
)

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: {fields: {collection: {eq: "posts"}}}
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
`
