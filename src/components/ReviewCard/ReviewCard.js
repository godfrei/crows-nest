import React from "react"
import { Link } from "gatsby"
import { link, card } from "./ReviewCard.module.scss"
import defaultImage from '../../images/reviews.png'

const ReviewCard = ({ review }) => {
    console.log(review);
    let slug = review.node.fields.slug;
    slug = slug.slice(0, slug.indexOf('-review'));
    let title = review.node.frontmatter.title;
    title = title.slice(0, title.indexOf(' Review'));
    const cover = (review.node.frontmatter.cover) ? review.node.frontmatter.cover.publicURL : defaultImage;

    return (
        <Link to={slug} className={link}>
            <article className={card} style={{ backgroundImage: `url(${cover})` }}>
                {/* <img src={cover} /> */}
                <h1 title={title}>{title}</h1>
                <p>{review.node.excerpt}</p>
                <small>Reviewed by {review.node.frontmatter.reviewers.join(', ')}</small>
                <small>Rating: {review.node.frontmatter.rating}</small>
            </article>
        </Link>
    )
}

export default ReviewCard