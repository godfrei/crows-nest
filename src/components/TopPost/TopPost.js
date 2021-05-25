import React from "react";
import { Link } from "gatsby";
import Tag from "../Tag";
import Aurebesh from "../Aurebesh";
import { top, cover, content, tag } from "./TopPost.module.scss";

const TopPost = ({ post }) => {
  const coverUrl = post.node.frontmatter.cover
    ? post.node.frontmatter.cover.publicURL
    : "/images/dark-forces-cover.jpg";

  const description = post.node.frontmatter.description || post.node.excerpt;

  return (
    <Link to={`/${post.node.fields.slug}`} key={post.title} className={top}>
      <div
        className={cover}
        style={{ backgroundImage: `url(${coverUrl})` }}
      ></div>
      <article>
        <div className={content}>
          <h1>
            <Aurebesh text={post.node.frontmatter.title} />
            {post.node.frontmatter.title}
          </h1>

          <Tag type="post" text="Blog" className={tag} /> <small>{post.node.fields.date}</small>

          <p>{description}</p>
          {/* <div dangerouslySetInnerHTML={{ __html: post.node.html }} /> */}
          <span className="fauxLink">Read More</span>
        </div>
      </article>
    </Link>
  );
};

export default TopPost;
