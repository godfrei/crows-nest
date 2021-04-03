import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MissionCard from '../MissionCard';
import { ecGrid } from './EditorsChoiceListing.module.scss';

const EditorsChoiceListing = () => {
    const data = useStaticQuery(graphql`
        query HomepageECQuery {
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