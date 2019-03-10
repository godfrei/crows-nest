import React from "react"
import Rating from "../Rating"

export default ({ node }) => {
    return(
        <div>
            <p>Reviewed {node.frontmatter.date} by {node.frontmatter.reviewer}</p>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
            <Rating score={node.frontmatter.rating} />
        </div>
    )
}