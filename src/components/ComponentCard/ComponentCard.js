import React from "react";
import { Link } from "gatsby";
import Aurebesh from "../Aurebesh";
import {
  card,
  authorList,
  cover,
  horizontal,
  vertical,
} from "./ComponentCard.module.scss";

const ComponentCard = ({ node, orientation }) => {
//   const coverUrl = node.frontmatter.cover ? node.frontmatter.cover.publicURL : "";
  const authors = node.frontmatter.authors ? node.frontmatter.authors.join(", ") : "Unknown";
  const orientationClass = orientation === "vertical" ? vertical : horizontal;

  return (
    <Link
      to={`/${node.fields.slug}`}
      className={`${card} ${orientationClass}`}
    >
      <article>
        <h1>
          <Aurebesh text={node.frontmatter.title} />
          {node.frontmatter.title}
        </h1>
        <span title="Authors" className={authorList}>
          {authors}
        </span>
        <p>{node.frontmatter.description}</p>
      </article>
    </Link>
  );
};

export default ComponentCard;
