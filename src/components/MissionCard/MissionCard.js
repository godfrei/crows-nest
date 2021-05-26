import React from "react";
import Card from "../Card";
import Rating from "../Rating";
import Tag from "../Tag";
import EditorsChoice from "../EditorsChoice";
import { authorList, ecClass } from "./missioncard.module.scss";

function averageRating(mission) {
  if (!mission.reviews || mission.reviews.length <= 0) return 0;
  let ratingTotal = 0;
  let numberOfReviews = 0;
  mission.reviews.forEach((review) => {
    if (typeof review.frontmatter.rating === "number") {
      ratingTotal += review.frontmatter.rating;
      numberOfReviews++;
    }
  });
  if (numberOfReviews === 0) return 0;
  return Math.round(ratingTotal / numberOfReviews);
}

function getEditorsChoice(node) {
  let editorsChoice = null;
  if (node.editorsChoice) {
    editorsChoice = (
      <div className={ecClass} title="Editors' Choice">
        <EditorsChoice />
      </div>
    );
  }
  return editorsChoice;
}

const MissionCard = ({ node, orientation = "horizontal" }) => {
  const coverURL = node.cover ? node.cover.publicURL : null;
  const authors = node.authors ? node.authors.join(", ") : "Unknown";
  const excerpt = node.description
    ? node.description.split(" ").slice(0, 30).join(" ")
    : "";
  const rating = averageRating(node);

  return (
    <Card link={`/missions/${node.slug}`} coverURL={coverURL} title={node.title} orientation={orientation} type="mission">
      {getEditorsChoice(node)}
      <div className="secondary">
        <Tag type="mission" text="Mission" />
        <span title="Authors" className={authorList}>
          {authors}
        </span>
      </div>

      <p>{excerpt}&hellip;</p>
      <Rating score={rating} />
    </Card>
  );
};

export default MissionCard;
