import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import { pageHeader, description } from "./blog.module.scss";

const posts = ({ data }) => (
  <Layout>
    <Helmet title={`Blog | ${config.siteTitle}`} />
    <SEO />
    <div className={pageHeader}>
      <div className={description}>
        <h1>Blog</h1>
        <p>The latest updates about the Nest, coupled with thoughts from an old level-reviewer.</p>
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
              name
              publicURL
            }
            coverAlt
            date
          }
        }
      }
    }
  }
`;
