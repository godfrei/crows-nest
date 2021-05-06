import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import SEO from "../../components/SEO";
import ComponentListing from "../../components/ComponentListing";
import config from "../../../data/SiteConfig";
import { header, description, list } from '../../styles/storage.module.scss';

const threeDos = ({ data }) => (
  <Layout>
    <Helmet title={`3DOs | ${config.siteTitle}`} />
    <SEO />
    <div className={header}>
      <h1>3DOs</h1>
      <div className={description}>
        <p>
          3DOs are the 3D objects used in Dark Forces. By 3D objects I'm referring
          to any ships, bridges, or shapes you see that use curves or angled
          surfaces. The Dark Forces engine isn't capable of rendering such objects
          so the authors used a sneaky trick and incorporated the X-Wing engine
          into the game to simulate these (at least I read that somewhere; can
          somebody confirm?). You don't truly interact with the objects; for
          instance if a VUE moves an object and it runs into you, you aren't
          pushed along, you simply pass through the object. You might also notice
          that the 3DOs seen in some levels pass through walls, or the authors
          often allow you to walk through a ship sitting on the ground. Easily the
          most inventive use of the 3DOs is used to make a bridge. If used
          properly and imaginatively 3DOs provide a very useful tool and can add a
          lot to a Dark Forces Add-On.
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

export default threeDos;

/* eslint no-undef: "off" */
export const threeDosQuery = graphql`
  query ThreeDosQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        # Only from the missions collection
        fields: { collection: { eq: "3dos" } }
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
