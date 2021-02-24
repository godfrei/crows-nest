import React from 'react'
import { Link } from 'gatsby'

const VocListing = ({ vocEdges }) => {
  const getVocList = () => {
    const vocList = []
    vocEdges.forEach(edge => {
      vocList.push({
        path: edge.node.fields.slug,
        cover: edge.node.frontmatter.cover,
        title: edge.node.frontmatter.title,
        date: edge.node.fields.date,
      })
    })
    return vocList
  }

  const vocList = getVocList()
  return (
    <div>
      <ul>
        {
        vocList.map(voc => (
          <li>
            <Link to={voc.path} key={voc.title}>
              <article>
                <div>
                  <h3>{voc.title}</h3>
                  <div>
                    {voc.date}
                  </div>
                  <p>{voc.excerpt}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VocListing
