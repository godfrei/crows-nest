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
import ReviewListing from '../components/ReviewListing'
import TopPost from '../components/TopPost';

const Index = ({ data }) => {

  const topPost = data.allMarkdownRemark.edges[0];
  const otherPosts = data.allMarkdownRemark.edges.slice(1);
  return (
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
        <div className="glow"></div>
        <main>
          <div id="site-title">
            <GradientTitle title={config.siteTitle} />
            <p>The most complete and up-to-date site for reviews and downloads of add-on levels for the LucasArts 3D first-person game <em>Dark Forces</em>. At least, it used to be. Getting back to it.</p>
          </div>
          <div className="home-grid">
            <div>
              <h2>Recent Posts</h2>
              <TopPost post={topPost} />
              <PostListing postEdges={otherPosts} />
            </div>
            <div>
              <h2>Recent Reviews</h2>
              <ReviewListing />
            </div>
          </div>
        </main>
        <Footer />
      </>
    </BodyClassName>
  );
}

export default Index

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: {collection: {eq: "posts"}}}
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          html
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
