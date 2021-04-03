import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../layout';
import config from '../../../data/SiteConfig';
import MissionListing from '../../components/MissionListing';

const EditorsChoicePage = () => {

    const data = useStaticQuery(graphql`
        query ECQuery {
            allMissionsJson(filter: {editorsChoice: {eq: true}}) {
                nodes {
                    slug
                    title
                    cover {
                        publicURL
                    }
                    description
                    date
                    authors
                }
            }
        }
    `);

    return (
        <Layout>
            <Helmet title={`Editor's Choice | ${config.siteTitle}`} />
            <h1>Editor's Choice</h1>
    
            <p>These missions have been selected as the best-of-the-best the Dark Forces community has to offer.</p>
    
            <MissionListing missionEdges={data.allMarkdownRemark.edges} />
        </Layout>

    );
}

export default EditorsChoicePage
