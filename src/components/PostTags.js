import React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'
import { tagContainer } from './PostTags.module.scss'

const PostTags = ({ tags }) => {
  return (
    <div className={tagContainer}>
      {tags &&
        tags.map(tag => (
          <Link key={tag} to={`/tags/${_.kebabCase(tag)}`}>
            <span>{tag}</span>
          </Link>
        ))}
    </div>
  )
}

export default PostTags
