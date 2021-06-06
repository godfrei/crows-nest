import React from "react";
import Helmet from "react-helmet";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import { pageHeader, description, cover } from "./blog.module.scss";

const posts = ({ data }) => (
  <Layout>
    <Helmet title={`Blog | ${config.siteTitle}`} />
    <SEO />
    <div className={pageHeader}>
      <StaticImage src="../../static/images/dagobah.jpg" alt="A meditative photo of floating rocks on Dagobah during Luke's training." className={cover} loading="eager" />
      <div className={description}>
        <h1>Blog</h1>
        <p>The latest updates about the Nest, coupled with thoughts from an old level-reviewer.</p>

        <p>There are a few vintage entries from 1997 kept around for nostalgia's sake. Odds are there's nothing to see there. Move along.</p>
      </div>
    </div>

    <PostListing postEdges={data.allMarkdownRemark.edges} />
  </Layout>
);

export default posts;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "posts" } } }
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
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            coverAlt
            date
          }
        }
      }
    }
  }
`;
