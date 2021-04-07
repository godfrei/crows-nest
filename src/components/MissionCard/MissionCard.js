import React from "react"
import { Link } from "gatsby"
import Aurebesh from '../Aurebesh';
import EditorsChoice from '../EditorsChoice';
import { card, authorList, cover, horizontal, vertical, ecClass } from "./missioncard.module.scss"

function averageRating(mission) {
    if(!mission.reviews || mission.reviews.length <= 0) return 0;
    let ratingTotal = 0;
    let numberOfReviews = 0;
    mission.reviews.forEach(review => {
      if(typeof review.frontmatter.rating === "number") {
        ratingTotal += review.frontmatter.rating;
        numberOfReviews++;
      }
    });
    if(numberOfReviews === 0) return 0;
    return Math.round(ratingTotal / numberOfReviews);
}

function getEditorsChoice(node) {
    let editorsChoice = null
    if(node.editorsChoice) {
        editorsChoice = (
            <div className={ecClass} title="Editors' Choice">
                <EditorsChoice />
            </div>
        )
    }
    return editorsChoice
}

const MissionCard = ({ node, orientation }) => {
    const coverUrl = (node.cover) ? node.cover.publicURL : '';
    const authors = node.authors ? node.authors.join(', ') : 'Unknown';
    const excerpt = node.description ? node.description.split(' ').slice(0, 30).join(' ') : '';
    const orientationClass = orientation === 'vertical' ? vertical : horizontal;
    const rating = averageRating(node);

    return (
        <Link to={`/missions/${node.slug}`} className={`${card} ${orientationClass}`}>
            <div className={cover} style={{ backgroundImage: `url(${coverUrl})` }}></div>
            <article>
                <h1>
                    <Aurebesh text={node.title} />
                    {node.title}
                </h1>
                {getEditorsChoice(node)}
                <span title="Authors" className={authorList}>{authors}</span>
                <p>{excerpt}&hellip;</p>
                {rating > 0 ? `Rating: ${rating}` : ""}
            </article>
        </Link>
    )
};

export default MissionCard;