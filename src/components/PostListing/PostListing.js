import React from "react";
import { Link } from "gatsby";
import {
  articleList,
  articleBox,
  cover,
  meta,
} from "./PostsListing.module.scss";

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
        excerpt: postEdge.node.excerpt,
      });
    });
    return postList;
  };

  const postList = getPostList();
  return (
    <ul className={articleList}>
      {postList.map((post) => {
        const coverUrl = post.cover
          ? post.cover.publicURL
          : "/images/dark-forces-cover.jpg";
        return (
          <li>
            <Link to={post.path} key={post.title} className={articleBox}>
              <article>
                <div
                  className={cover}
                  style={{ backgroundImage: `url(${coverUrl})` }}
                ></div>
                <h3>{post.title}</h3>
                <div className={meta}>{post.date}</div>
                <p>{post.excerpt}</p>
              </article>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostListing;
