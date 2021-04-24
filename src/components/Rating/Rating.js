import React from "react";
import { times } from "lodash";
import { ratingScore, rating, fullStar, emptyStar } from "./Rating.module.scss";

export default ({ score, className = "" }) => {
  if (!score) return null;

  const emptyStars = 4 - score;

  return (
    <div className={`${rating} ${className}`}>
      <strong className={ratingScore} aria-label={`Rating: ${score} out of 4 stars`}>
        {times(score, () => <span className={fullStar}>★</span>)}
        {times(emptyStars, () => <span className={emptyStar}>☆</span>)}
      </strong>
    </div>
  );
};
