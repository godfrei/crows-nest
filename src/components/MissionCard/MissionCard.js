import React from "react"
import { Link } from "gatsby"
import { card, coverImage } from "./missioncard.module.scss"

export default ({ node }) => {
    const cover = (node.frontmatter.cover) ? node.frontmatter.cover.publicURL : "";
    return (
        <Link to={`/missions/${node.fields.slug}`} className={card}>
            <div className={coverImage} style={{ backgroundImage: `url(${cover})`}} />
            <strong>{node.frontmatter.title}</strong>
        </Link>
    )
}