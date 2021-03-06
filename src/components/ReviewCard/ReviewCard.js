import React from "react"
import { Link } from "gatsby"
import { card } from "./ReviewCard.module.scss"

const ReviewCard = ({ review }) => {
    let slug = review.node.fields.slug;
    slug = slug.slice(0, slug.indexOf('-review'));
    let title = review.node.frontmatter.title;
    title = title.slice(0, title.indexOf(' Review'));

    // const cover = (node.frontmatter.cover) ? node.frontmatter.cover.publicURL : "";
    return (
        <Link to={slug} className={card}>
            {/* <div className={cardStyles.cover} style={{ backgroundImage: `url(${cover})`}} /> */}
            <strong>{title}</strong>
            <small>Reviewed by {review.node.frontmatter.reviewers.join(', ')}</small>
            <small>Rating: {review.node.frontmatter.rating}</small>
            <p>{review.node.excerpt}</p>
        </Link>
    )
}

export default ReviewCard