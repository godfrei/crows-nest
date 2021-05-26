import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import SEO from "../../components/SEO";
import ComponentListing from "../../components/ComponentListing";
import config from "../../../data/SiteConfig";
import { header, description, list } from '../../styles/storage.module.scss';

const fmes = ({ data }) => (
  <Layout>
    <Helmet title={`FMEs | ${config.siteTitle}`} />
    <SEO />
    <div className={header}>
      <h1>FMEs</h1>
      <div className={description}>
        <p>
        FME is an abbreviation for 'frame', and is an apt description of what this file is.  FMEs are the one frame objects that you find lying around in the levels.  Lampposts, dead bodies, rocks, and most of the powerups and items are FMEs.  You can tell when you're looking at one because no matter which direction you look at it from it always looks the same, facing the same direction.
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

export default fmes;

/* eslint no-undef: "off" */
export const fmesQuery = graphql`
  query FMEsQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        # Only from the missions collection
        fields: { collection: { eq: "fmes" } }
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
            description
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
