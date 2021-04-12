import React from "react";
import { Link } from "gatsby";
import Aurebesh from "../Aurebesh";
import { card, cover, vertical, horizontal } from "./ReviewCard.module.scss";
import defaultImage from "../../images/reviews.png";

const ReviewCard = ({ review, orientation }) => {
  const mission = review.frontmatter.mission;
  let slug = mission.slug;
  let title = mission.title;
  const coverUrl = mission.cover ? mission.cover.publicURL : defaultImage;
  const orientationClass = orientation === "vertical" ? vertical : horizontal;

  return (
    <Link to={`/missions/${slug}`} className={`${card} ${orientationClass}`}>
      <div
        className={cover}
        style={{ backgroundImage: `url(${coverUrl})` }}
      ></div>
      <article>
        <h1>
          <Aurebesh text={title} />
          {title}
        </h1>
        <p>{review.excerpt}</p>
        <small>Reviewed by {review.frontmatter.authors.join(", ")}</small>
        <small>Rating: {review.frontmatter.rating}</small>
      </article>
    </Link>
  );
};

export default ReviewCard;
