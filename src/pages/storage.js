import React from "react";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO";
import ComponentListing from "../components/ComponentListing";
import Layout from "../layout";
import {
  pageHeader,
  sortOptions,
  active,
  description,
} from "./storage.module.scss";

const Storage = ({ data }) => {
  const linkProps = {
    activeClassName: active,
    partiallyActive: true,
  };
  return (
    <Layout>
      <Helmet>
        <title>Storage | {config.siteTitle}</title>
      </Helmet>
      <SEO />
      <div className={pageHeader}>
        <div className={description}>
          <h1>Storage</h1>

          <p>
            When looking for those special pieces to add to your custom mission,
            this is the place to stop.
          </p>
          <p>
            The creators of the <em>Dark Forces</em> community blew past the
            array of ships, textures, enemies, and sounds in the original game,
            delving deep into the expanded universe and beyond for the items
            they needed to make their missions come alive.
          </p>
        </div>
        <div className={sortOptions}>
          Show:
          <ul>
            <li>
              <Link to="/storage/" activeClassName={active}>
                All
              </Link>
            </li>
            <li>
              <Link to="/storage/3dos/" {...linkProps}>
                3DOs
              </Link>
            </li>
            <li>
              <Link to="/storage/bms/" {...linkProps}>
                BMs
              </Link>
            </li>
            <li>
              <Link to="/storage/fmes/" {...linkProps}>
                FMEs
              </Link>
            </li>
            <li>
              <Link to="/storage/vocs/" {...linkProps}>
                VOCs
              </Link>
            </li>
            <li>
              <Link to="/storage/waxes/" {...linkProps}>
                WAXes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <ComponentListing edges={data.allMarkdownRemark.edges} />
    </Layout>
  );
};

export default Storage;

/* eslint no-undef: "off" */
export const storageQuery = graphql`
  query StorageQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        # Only from the missions collection
        fields: { collection: { in: ["3dos", "fmes", "vocs", "waxes", "bms"] } }
      }
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
            collection
          }
          excerpt
          frontmatter {
            title
            authors
            filename {
              publicURL
            }
            cover {
              publicURL
            }
            description
            date
          }
        }
      }
    }
  }
`;
