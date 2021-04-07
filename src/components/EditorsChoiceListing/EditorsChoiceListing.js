import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MissionCard from '../MissionCard';
import { ecGrid } from './EditorsChoiceListing.module.scss';

const EditorsChoiceListing = () => {
    const data = useStaticQuery(graphql`
        query HomepageECQuery {
            allMissionsJson(
                filter: {editorsChoice: {eq: true}}
                sort: {fields: date, order: DESC}
                limit: 5
            ) {
                nodes {
                    slug
                    title
                    cover {
                        publicURL
                    }
                    description
                    date
                    authors
                    editorsChoice
                }
            }
        }
    `);
    
    // console.log(data);

    return (
        // <MissionListing missionEdges={data.allMarkdownRemark.edges} />
        <ul className={ecGrid}>
            {
                data.allMissionsJson.nodes.map(mission => {
                    // console.log(mission);
                    return (
                        <li key={mission.slug}>
                            <MissionCard node={mission} orientation="vertical" />
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default EditorsChoiceListing;