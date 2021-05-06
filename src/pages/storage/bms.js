import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import SEO from "../../components/SEO";
import ComponentListing from "../../components/ComponentListing";
import config from "../../../data/SiteConfig";
import { header, description, list } from '../../styles/storage.module.scss';

const bms = ({ data }) => (
  <Layout>
    <Helmet title={`BMs | ${config.siteTitle}`} />
    <SEO />
    <div className={header}>
      <h1>BMs</h1>
      <div className={description}>
        <p>
        BMs are the textures used in Dark Forces.  Every pattern on a wall, every sign, is a BM.  The weapon and HUD graphics are also BMs, as are pictures in briefings and the image you see as the mission is loading.  BMs are essentially 256 color images, much like bitmaps but with some different formatting.
        </p>

        <p>
          The files below are available for download and use in custom levels or
          your own Dark Forces gaming. Please respect the author's creation and
          follow any guidelines included in attached text files.
        </p>
      </div>
    </div>
    
    <div className={list}>
      <ComponentListing edges={data.allMarkdownRemark.edges} />
    </div>
    
  </Layout>
);

export default bms;

/* eslint no-undef: "off" */
export const bmsQuery = graphql`
  query BMsQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        # Only from the missions collection
        fields: { collection: { eq: "bms" } }
      }
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          frontmatter {
            authors
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
`;
