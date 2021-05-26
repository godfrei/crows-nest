import React from "react";
import Rating from "../Rating";
import { review } from "./review.module.scss";

export default ({ node }) => {
  return (
    <article className={review}>
      <p>
        Reviewed {node.frontmatter.date} by {node.frontmatter.reviewer}
      </p>
      <div dangerouslySetInnerHTML={{ __html: node.html }} />
      <Rating score={node.frontmatter.rating} />
    </article>
  );
};
