import React from "react"
import { Link } from "gatsby"
import Aurebesh from '../Aurebesh';
import { card, cover, vertical, horizontal } from "./ReviewCard.module.scss"
import defaultImage from '../../images/reviews.png'

const ReviewCard = ({ review, orientation }) => {
    const mission = review.node.frontmatter.mission;
    let slug = mission.fields.slug;
    let title = mission.frontmatter.title;
    const coverUrl = (mission.frontmatter.cover) ? mission.frontmatter.cover.publicURL : defaultImage;
    const orientationClass = orientation === 'vertical' ? vertical : horizontal;

    return (
        <Link to={`/missions/${slug}`} className={`${card} ${orientationClass}`}>
            <div className={cover} style={{ backgroundImage: `url(${coverUrl})` }}></div>
            <article>
                <h1>
                    <Aurebesh text={title} />
                    {title}
                </h1>
                <p>{review.node.excerpt}</p>
                <small>Reviewed by {review.node.frontmatter.reviewers.join(', ')}</small>
                <small>Rating: {review.node.frontmatter.rating}</small>
            </article>
        </Link>
    )
}

export default ReviewCard