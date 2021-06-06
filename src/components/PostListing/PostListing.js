import React from "react";
import { getImage, GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import Tag from "../Tag";
import Aurebesh from "../Aurebesh";
import {
  articleList,
  date,
} from "./PostsListing.module.scss";
import { card, cover } from "../Card/Card.module.scss";

const PostListing = ({ postEdges }) => {
  const getPostList = () => {
    const postList = [];
    postEdges.forEach((postEdge) => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        categories: postEdge.node.frontmatter.categories,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        description:
          postEdge.node.frontmatter.description || postEdge.node.excerpt,
      });
    });
    return postList;
  };

  const getCover = (post) => {
    if (post.cover) {
      const image = getImage(post.cover);
      return <GatsbyImage image={image} alt="" className={cover} />
    }
    else {
      return <StaticImage src="../../../static/images/dark-forces-cover.jpg" alt="" className={cover} />
    }
  }

  const postList = getPostList();
  return (
    <ul className={articleList}>
      {postList.map((post) => {
        return (
          <li key={post.path}>
            <Link
              to={`/${post.path}`}
              className={`${card}`}
            >
              {getCover(post)}
              <article>
                <h1>
                  <Aurebesh text={post.title} />
                  {post.title}
                </h1>
                <div className="secondary">
                  <Tag text="Blog" />
                  <span className={date}>{post.date}</span>
                </div>
                <p>{post.description}</p>
                <span className="fauxLink">Read More</span>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostListing;
