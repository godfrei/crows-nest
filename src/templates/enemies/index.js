import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../../layout";
import EnemiesLayout from "../../layout/enemies";
import config from "../../../data/SiteConfig";
import { cover } from "./enemies.module.scss"; 

const EnemyTemplate = ({ data, pageContext }) => {
  console.log(data);
  const enemy = data.markdownRemark;
  return (
    <Layout>
      <Helmet title={`${enemy.frontmatter.title} - ${config.siteTitle}`} />
      <EnemiesLayout>
        <article>
          <h1>{enemy.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: enemy.html }} />
        </article>
        {enemy.frontmatter.cover && (
          <div
            className={cover}
            style={{backgroundImage: `url(${enemy.frontmatter.cover.publicURL})`}}
          />
        )}
      </EnemiesLayout>
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
        cover {
          publicURL
        }
      }
    }
  }
`;
