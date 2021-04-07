import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import WaxListing from "../components/WaxListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

const waxes = ({ data }) => (
  <Layout>
    <main>
      <Helmet title={`WAXes | ${config.siteTitle}`} />
      <SEO />
      <h1>WAXes</h1>

      <p>
        You know that ferocious Dark Trooper that's looming over you, rushing
        forward at an incredible pace to speed your journey to the land beyond?
        You really have nothing to fear because it's just a grouping of 8 flat
        images with some logic applied; known otherwise as a WAX. All enemies in
        Dark Forces are WAXes with the exception of the welders, mousebots and
        turrets which are 3DOs. Waxes also include moving textures or other
        stationary objects that have different views as you move around them to
        give you the sensation that you're actually walking around an object.
      </p>

      <p>
        The files below are available for download and use in custom levels or
        your own Dark Forces gaming. Please respect the author's creation and
        follow any guidelines included in attached text files.
      </p>

      <WaxListing waxEdges={data.allMarkdownRemark.edges} />
    </main>
  </Layout>
);

export default waxes;

/* eslint no-undef: "off" */
export const waxQuery = graphql`
  query WaxQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
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
