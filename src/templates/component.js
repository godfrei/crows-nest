import React from "react";
import { graphql, Link, withPrefix } from "gatsby";
import _ from "lodash";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Layout from "../layout";
import { component } from "./Component.module.scss";

const ComponentTemplate = ({ data, pageContext }) => {
  function getDownloadLink(data) {
    const file = data.markdownRemark.frontmatter.filename;
    if (file) {
      return (
        <a href={file.publicURL} className="download">
          <strong>Download {data.markdownRemark.frontmatter.title}</strong>
        </a>
      );
    }
    return null;
  }

  const node = data.markdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>{`${node.frontmatter.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <div className={component}>
        <article>
          <h1>{node.frontmatter.title}</h1>
          Author(s):{" "}
          {node.frontmatter.authors.map((author, index) => {
            return (
              <React.Fragment
                key={`${node.frontmatter.title}-${node.frontmatter.component_type}`}
              >
                {index >= 1 ? `, ` : ``}
                <Link to={`/authors/${_.kebabCase(author)}`}>{author}</Link>
              </React.Fragment>
            );
          })}
          <p>{node.frontmatter.description}</p>
          {getDownloadLink(data)}
          <hr />
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </article>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        authors
        date
        description
        component_type
        filename {
          publicURL
        }
      }
    }
  }
`;

export default ComponentTemplate;
