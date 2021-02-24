import React from "react"
import { Link } from "gatsby"
import cardStyles from "./missioncard.module.scss"

export default ({ node }) => {
    const cover = (node.frontmatter.cover) ? node.frontmatter.cover.publicURL : "";
    return (
        <Link to={node.fields.slug} className={cardStyles.card}>
            <div className={cardStyles.cover} style={{ backgroundImage: `url(${cover})`}} />
            <strong>{node.frontmatter.title}</strong>
        </Link>
    )
}