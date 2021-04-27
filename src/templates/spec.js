import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import Layout from "../layout";
import SpecNav from "../components/SpecNav";
import DatabaseLayout from "../layout/database";

const SpecTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Helmet>
        <title>{`${post.frontmatter.title} | DF Specs | ${config.siteTitle}`}</title>
      </Helmet>
      <div className="text">
        <article>
          <header>
            <small>Dark Forces Unofficial Specifications v3.2</small>
            <h1>{post.frontmatter.title}</h1>
          </header>

          <SpecNav />

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        date
      }
    }
  }
`;

export default SpecTemplate;
