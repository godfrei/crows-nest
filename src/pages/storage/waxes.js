import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import SEO from "../../components/SEO";
import ComponentListing from "../../components/ComponentListing";
import config from "../../../data/SiteConfig";
import { header, description, list } from '../../styles/storage.module.scss';

const waxes = ({ data }) => (
  <Layout>
    <Helmet title={`WAXes | ${config.siteTitle}`} />
    <SEO />
    <div className={header}>
      <h1>WAXes</h1>
      <div className={description}>
        <p>
        You know that ferocious Dark Trooper that's looming over you, rushing forward at an incredible pace to speed your journey to the land beyond?  You really have nothing to fear because it's just a grouping of 8 flat images with some logic applied; known otherwise as a WAX.  All enemies in Dark Forces are WAXes with the exception of the welders, mousebots and turrets which are 3DOs.  Waxes also include moving textures or other stationary objects that have different views as you move around them to give you the sensation that you're actually walking around an object.  
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

export default waxes;

/* eslint no-undef: "off" */
export const waxesQuery = graphql`
  query WAXesQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        # Only from the missions collection
        fields: { collection: { eq: "waxes" } }
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
