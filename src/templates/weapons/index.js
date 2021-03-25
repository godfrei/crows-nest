import React from 'react';
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../../layout';
import DatabaseLayout from '../../layout/database';
import WeaponsLayout from '../../layout/weapons';
import config from '../../../data/SiteConfig';

const WeaponTemplate = ({ data, pageContext }) => {
    const weapon = data.markdownRemark;
    return (
        <Layout>
            <Helmet title={` ${weapon.frontmatter.title} - ${config.siteTitle}`} />
            <DatabaseLayout>
                <WeaponsLayout>
                    <article>
                        <h1>{weapon.frontmatter.title}</h1>

                        <div dangerouslySetInnerHTML={{ __html: weapon.html }} />
                    </article>
                </WeaponsLayout>
            </DatabaseLayout>
        </Layout>
    );
};

export default WeaponTemplate;

export const pageQuery = graphql`
  query WeaponBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`