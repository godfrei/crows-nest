import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MissionCard from '../MissionCard';
import { ecGrid } from './EditorsChoiceListing.module.scss';

const EditorsChoiceListing = () => {
    const data = useStaticQuery(graphql`
        query ECQuery {
            allMarkdownRemark(
                limit: 5
                sort: {fields: [fields___date], order: DESC}
                filter: {frontmatter: {editorsChoice: {eq: "yes"}}}
            ) {
                edges {
                    node {
                        fields {
                            slug
                            date(formatString: "MMMM DD, YYYY")
                        }
                        frontmatter {
                            title
                            cover {
                                name
                                publicURL
                            }
                            description
                            date
                            authors
                        }
                    }
                }
            }
        }
    `);

    return (
        // <MissionListing missionEdges={data.allMarkdownRemark.edges} />
        <ul className={ecGrid}>
            {
                data.allMarkdownRemark.edges.map(mission => {
                    console.log(mission);
                    return (
                        <li key={mission.node.fields.slug}>
                            <MissionCard node={mission.node} orientation="vertical" />
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default EditorsChoiceListing;