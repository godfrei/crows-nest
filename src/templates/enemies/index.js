import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../../layout";
import DatabaseLayout from "../../layout/database";
import EnemiesLayout from "../../layout/enemies";
import config from "../../../data/SiteConfig";

const EnemyTemplate = ({ data, pageContext }) => {
  console.log(data);
  const enemy = data.markdownRemark;
  return (
    <Layout>
      <Helmet title={` ${enemy.frontmatter.title} - ${config.siteTitle}`} />
      <DatabaseLayout>
        <EnemiesLayout>
          <article>
            <h1>{enemy.frontmatter.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: enemy.html }} />
          </article>
        </EnemiesLayout>
      </DatabaseLayout>
    </Layout>
  );
};

export default EnemyTemplate;

export const pageQuery = graphql`
  query EnemyBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
