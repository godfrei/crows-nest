import React from "react";
import { top, cover, content } from "./TopPost.module.scss";

const TopPost = ({ post }) => {
  const coverUrl = post.node.frontmatter.cover
    ? post.node.frontmatter.cover.publicURL
    : "/images/dark-forces-cover.jpg";

  return (
    <article class={top}>
      <div
        className={cover}
        style={{ backgroundImage: `url(${coverUrl})` }}
      ></div>
      <div class={content}>
        <h1>{post.node.frontmatter.title}</h1>

        <div>{post.node.fields.date}</div>

        <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
      </div>
    </article>
  );
};

export default TopPost;
