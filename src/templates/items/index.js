import React from 'react';
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../../layout';
import DatabaseLayout from '../../layout/database';
import ItemsLayout from '../../layout/items';
import config from '../../../data/SiteConfig';

const ItemTemplate = ({ data, pageContext }) => {
    console.log(data);
    const item = data.markdownRemark;
    return (
        <Layout>
            <Helmet title={` ${item.frontmatter.title} - ${config.siteTitle}`} />
            <DatabaseLayout>
                <ItemsLayout>
                    <article>
                        <h1>{item.frontmatter.title}</h1>

                        <div dangerouslySetInnerHTML={{ __html: item.html }} />
                    </article>
                </ItemsLayout>
            </DatabaseLayout>
        </Layout>
    );
};

export default ItemTemplate;

export const pageQuery = graphql`
  query ItemBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`