import React from "react";
import Tag from "../Tag";
import Card from "../Card";
import {
  articleList,
  date,
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
        description:
          postEdge.node.frontmatter.description || postEdge.node.excerpt,
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
            <Card link={`/${post.path}`} title={post.title} coverURL={coverUrl}>
              <div className="secondary">
                <Tag text="Blog" />
                <span className={date}>{post.date}</span>
              </div>
              <p>{post.description}</p>
              <span className="fauxLink">Read More</span>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default PostListing;
