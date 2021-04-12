import React from "react";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO";
import Layout from "../layout";
import { pageHeader, sortOptions, active, typeClass, storageTable, authors } from './storage.module.scss';

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
        <div>
          <h1>Storage</h1>

          <p>When looking for those special pieces to add to your custom mission, this is the place to stop.</p>
          <p>The creators of the <em>Dark Forces</em> community blew past the array of ships, textures, enemies, and sounds in the original game, delving deep into the expanded universe and beyond for the items they needed to make their missions come alive.</p>
        </div>
        <div className={sortOptions}>
            Show:
            <ul>
              <li>
                <Link to="/storage" activeClassName={active}>
                  All
                </Link>
              </li>
              <li>
                <Link to="/3dos"  {...linkProps}>
                  3DOs
                </Link>
              </li>
              <li>
                <Link to="/fmes" {...linkProps}>
                  FMEs
                </Link>
              </li>
              <li>
                <Link to="/vocs" {...linkProps}>
                  VOCs
                </Link>
              </li>
              <li>
                <Link to="/waxes" {...linkProps}>
                  WAXes
                </Link>
              </li>
            </ul>
        </div>
      </div>

      <table className={storageTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Preview</th>
            <th>Type</th>
            <th>Description</th>
            <th>Download</th>
          </tr>
        </thead>
        {data.allMarkdownRemark.edges.map(edge => {
          let type = "";
          switch (edge.node.fields.collection) {
            case "fmes":
              type = "FME";
              break;
            case "waxes":
              type = "WAX";
              break;
            case "vocs":
              type = "VOC";
              break;
            default:
              type = "3DO";
              break;
          }
          let downloadURL = edge.node.frontmatter.filename?.publicURL || null;
          return (
            <tr>
              <td>
                <a href={edge.node.fields.slug}>{edge.node.frontmatter.title}</a>
                <span className={authors}>{edge.node.frontmatter.authors.join(', ')}</span>
              </td>
              <td>Preview</td>
              <td><span className={typeClass}>{type}</span></td>
              <td>{edge.node.frontmatter.description}</td>
              <td>
                {downloadURL && (
                  <a href={downloadURL}>Download</a>
                )}
              </td>
            </tr>
          )
        })}
      </table>
    </Layout>
  )
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
        fields: { collection: { in: ["3dos", "fmes", "vocs", "waxes"] } }
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
            description
            date
          }
        }
      }
    }
  }
`;