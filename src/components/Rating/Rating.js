import React from "react";
import { times } from "lodash";
import { ratingScore, rating, fullStar, emptyStar } from "./Rating.module.scss";

export default ({ score, className = "" }) => {
  if (!score) return null;

  const emptyStars = 4 - score;

  return (
    <div className={`${rating} ${className}`}>
      <strong className={ratingScore} aria-label={`Rating: ${score} out of 4 stars`}>
        {times(score, (i) => <span className={fullStar} key={`star${i}`}>★</span>)}
        {times(emptyStars, (i) => <span className={emptyStar} key={`emptyStar${i}`}>☆</span>)}
      </strong>
    </div>
  );
};
