import React from "react"
import { Link } from "gatsby"
import _ from "lodash"

export default ({ node }) => {
    return (
        <>
            Author(s): { node.frontmatter.authors.map((author, index) => {
                return (
                    <React.Fragment key={`${node.frontmatter.title}-${author}`}>
                        { (index >=1) ? `, ` : `` }
                        <Link to={`/authors/${_.kebabCase(author)}`}>{author}</Link>
                    </React.Fragment>
                )
            })}
        </>
    )
}