import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import MissionListing from "../MissionListing";
import { related } from "./RelatedMissions.module.scss";

const RelatedMissions = ({ origMission }) => {
    const data = useStaticQuery(graphql`
        query {
            allMissionsJson(sort: { fields: date, order: DESC }) {
                nodes {
                    title
                    date
                    slug
                    cover {
                        publicURL
                    }
                    editorsChoice
                    description
                    authors
                    reviews {
                        frontmatter {
                            rating
                        }
                    }
                }
            }
        }
    `);

    const { allMissionsJson: { nodes }, } = data;
    let relatedMissions = nodes.filter((mission) => {
        let foundAuthors = 0;
        for (const author of origMission.authors) {
            if(mission.authors.find(missionAuthor => missionAuthor === author)) {
                foundAuthors++;
            }
        }
        return foundAuthors > 0;
    });
    relatedMissions = relatedMissions.filter(mission => mission.slug !== origMission.slug)
    relatedMissions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    if (relatedMissions.length <= 0) return null;
    return (
        <div className={related}>
            <div className="content">
                <section>
                    <h2>Related Missions</h2>
                    <p>Enjoy {origMission.title}? Check out these other missions by the same author(s).</p>
                    <MissionListing missionNodes={relatedMissions.slice(0,2)} />
                </section>
            </div>
        </div>
    )
}

export default RelatedMissions;