import React from "react"
import { Link } from "gatsby"
import Aurebesh from '../Aurebesh';
import { card, authorList, cover } from "./missioncard.module.scss"

export default ({ node }) => {
    const mission = node.frontmatter;
    const coverUrl = (mission.cover) ? mission.cover.publicURL : '';
    const authors = mission.authors ? mission.authors.join(', ') : 'Unknown';
    const excerpt = mission.description ? mission.description.split(' ').slice(0, 30).join(' ') : '';
    return (
        <Link to={`/missions/${node.fields.slug}`} className={card}>
            <div className={cover} style={{ backgroundImage: `url(${coverUrl})` }}></div>
            <strong>
                <Aurebesh text={node.frontmatter.title} />
                {node.frontmatter.title}
            </strong>
            <span title="Authors" className={authorList}>{authors}</span>
            <p>{excerpt}&hellip;</p>
        </Link>
    )
}