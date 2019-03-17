import React from "react"
import { Link } from "gatsby"
import cardStyles from "./missioncard.module.scss"

export default ({ node }) => {
    const heroImage = (node.frontmatter.heroImage) ? node.frontmatter.heroImage.publicURL : "";
    console.log(heroImage)
    return (
        <Link to={node.fields.slug} className={cardStyles.card}>
            <div className={cardStyles.heroImage} style={{ backgroundImage: `url(${heroImage})`}} />
            <strong>{node.frontmatter.title}</strong>
        </Link>
    )
}