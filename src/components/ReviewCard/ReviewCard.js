import React from "react";
import Card from "../Card";
import Rating from "../Rating";
import { authorList } from "./ReviewCard.module.scss";

const ReviewCard = ({ review, orientation }) => {
  const mission = review.frontmatter.mission;
  const coverURL = mission.cover ? mission.cover.publicURL : defaultImage;

  return (
    <Card link={`/missions/${mission.slug}`} coverURL={coverURL} title={mission.title} orientation={orientation} type="mission">
      <small className={authorList}>Reviewed by {review.frontmatter.authors.join(", ")}</small>
      <p>{review.excerpt}</p>
      <Rating score={review.frontmatter.rating} />
    </Card>
  );
};

export default ReviewCard;
