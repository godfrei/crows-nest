import React from "react";
import Card from "../Card";
import Rating from "../Rating";
import Tag from "../Tag";
import Ribbon from "../Ribbon";
import { authorList } from "./ReviewCard.module.scss";

const ReviewCard = ({ review, orientation }) => {
  const mission = review.frontmatter.mission;
  const coverURL = mission.cover ? mission.cover.publicURL : '';
  const desc = review.frontmatter.description || review.excerpt;

  /* Less than a week, calculated via milliseconds */
  const newReview = new Date() - new Date(review.frontmatter.date) < 604800000;

  return (
    <Card link={`/missions/${mission.slug}`} coverURL={coverURL} title={mission.title} orientation={orientation} type="mission">
      {newReview && <Ribbon label="New!" />}
      <div className="secondary">
        <Tag type="mission" text="Review" />
        <small className={authorList}>Reviewed by {review.frontmatter.authors.join(", ")}</small>
      </div>
      
      <p>{desc}</p>
      <Rating score={review.frontmatter.rating} />
    </Card>
  );
};

export default ReviewCard;
