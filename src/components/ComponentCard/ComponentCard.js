import React from "react";
import Card from "../Card";
import {
  authorList,
  componentCover,
} from "./ComponentCard.module.scss";

const ComponentCard = ({ node, orientation }) => {
  const coverUrl = node.frontmatter.cover ? node.frontmatter.cover.publicURL : "";
  const authors = node.frontmatter.authors ? node.frontmatter.authors.join(", ") : "Unknown";

  return (
    <Card link={`/${node.fields.slug}`} title={node.frontmatter.title} orientation={orientation} type="component">
      <span title="Authors" className={authorList}>
        {authors}
      </span>
      <p>{node.frontmatter.description}</p>
      {coverUrl && (
        <div className={componentCover} style={{ backgroundImage: `url(${coverUrl})` }} />
      )}
    </Card>
  );
};

export default ComponentCard;
