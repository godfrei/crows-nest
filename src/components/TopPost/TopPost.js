import React from "react";
import { Link } from "gatsby";
import { top, cover, content } from "./TopPost.module.scss";

const TopPost = ({ post }) => {
  const coverUrl = post.node.frontmatter.cover
    ? post.node.frontmatter.cover.publicURL
    : "/images/dark-forces-cover.jpg";

  const description = post.node.frontmatter.description || post.node.excerpt;

  return (
    <Link to={`/${post.node.fields.slug}`} key={post.title} class={top}>
      <article>
        <div
          className={cover}
          style={{ backgroundImage: `url(${coverUrl})` }}
        ></div>
        <div class={content}>
          <h1>{post.node.frontmatter.title}</h1>

          <div>{post.node.fields.date}</div>

          <p>{description}</p>
          {/* <div dangerouslySetInnerHTML={{ __html: post.node.html }} /> */}
          <a className="fauxLink">Read More</a>
        </div>
      </article>
    </Link>
  );
};

export default TopPost;
