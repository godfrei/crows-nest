import React from 'react'
import { Link } from 'gatsby'
import { articleList, articleBox, right, meta } from './PostsListing.module.scss'

const PostListing = ({ postEdges }) => {
  const getPostList = () => {
    const postList = []
    postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        categories: postEdge.node.frontmatter.categories,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
      })
    })
    return postList
  }

  const postList = getPostList()
  return (
    <div className={articleList}>
      {
      postList.map(post => (
        <Link to={post.path} key={post.title}>
          <article className={articleBox}>
            <div className={right}>
              <h3>{post.title}</h3>
              <div className={meta}>
                {post.date} &mdash; <span>{post?.categories?.join(' / ')}</span>
              </div>
              <p>{post.excerpt}</p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

export default PostListing
