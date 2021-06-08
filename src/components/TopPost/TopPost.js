import React from "react";
import { Link } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import Tag from "../Tag";
import Aurebesh from "../Aurebesh";
import { top, cover, content, tag } from "./TopPost.module.scss";

const TopPost = ({ post }) => {
  const image = getImage(post.node.frontmatter.cover);
  const description = post.node.frontmatter.description || post.node.excerpt;

  return (
    <Link to={`/${post.node.fields.slug}`} key={post.title} className={top}>
      <GatsbyImage image={image} alt="" loading="eager" className={cover} />
      <article>
        <div className={content}>
          <h1>
            <Aurebesh text={post.node.frontmatter.title} />
            {post.node.frontmatter.title}
          </h1>

          <Tag type="post" text="Blog" className={tag} /> <small>{post.node.fields.date}</small>

          <p>{description}</p>
          <span className="fauxLink">Read More</span>
        </div>
      </article>
    </Link>
  );
};

export default TopPost;
