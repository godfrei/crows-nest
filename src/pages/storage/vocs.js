import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import SEO from "../../components/SEO";
import ComponentListing from "../../components/ComponentListing";
import config from "../../../data/SiteConfig";
import { header, description, list } from '../../styles/storage.module.scss';

const vocs = ({ data }) => (
  <Layout>
    <Helmet title={`VOCs | ${config.siteTitle}`} />
    <SEO />
    <div className={header}>
      <h1>VOCs</h1>
      <div className={description}>
        <p>
        VOCs are the sounds that you hear in the background, the sound of a blaster or detonator, a door opening, or somebody talking.  In short any sound you hear in Dark Forces is a VOC file(except for the MIDI music).  Here you can find some files of new sounds created for use in Dark Forces levels.
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

export default vocs;

/* eslint no-undef: "off" */
export const vocsQuery = graphql`
  query VOCsQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        # Only from the missions collection
        fields: { collection: { eq: "vocs" } }
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
