import React from "react"
import { Link } from "gatsby"
import Aurebesh from '../Aurebesh';
import { card, authorList, cover, horizontal, vertical } from "./missioncard.module.scss"

export default ({ node, orientation }) => {
    const mission = node.frontmatter;
    const coverUrl = (mission.cover) ? mission.cover.publicURL : '';
    const authors = mission.authors ? mission.authors.join(', ') : 'Unknown';
    const excerpt = mission.description ? mission.description.split(' ').slice(0, 30).join(' ') : '';
    const orientationClass = orientation === 'vertical' ? vertical : horizontal;

    return (
        <Link to={`/missions/${node.fields.slug}`} className={`${card} ${orientationClass}`}>
            <div className={cover} style={{ backgroundImage: `url(${coverUrl})` }}></div>
            <article>
                <h1>
                    <Aurebesh text={node.frontmatter.title} />
                    {node.frontmatter.title}
                </h1>
                <span title="Authors" className={authorList}>{authors}</span>
                <p>{excerpt}&hellip;</p>
            </article>
        </Link>
    )
}