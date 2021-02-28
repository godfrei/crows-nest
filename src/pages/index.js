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
        <div>
          <Navigation />
        </div>
      </header>
      <main>
        <div id="site-title">
          <GradientTitle title={config.siteTitle} />
          <p>The most complete and up-to-date site for reviews and downloads of add-on levels for the LucasArts 3D first-person game <em>Dark Forces</em>. At least, it used to be. Getting back to it.</p>
        </div>
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
