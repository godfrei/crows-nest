import React from "react"
import _ from "lodash"

export default ({ node }) => {
    return(
        <div>
            <h2>Tech Specs</h2>
            <ul>
                <li><strong>Level(s) Replaced:</strong> {node.frontmatter.levelReplaced}</li>
                <li><strong>Difficulty Settings:</strong> {_.capitalize(node.frontmatter.difficulty)}</li>
                <li><strong>New BMs:</strong> {_.capitalize(node.frontmatter.bm)}</li>
                <li><strong>New FMEs:</strong> {_.capitalize(node.frontmatter.fme)}</li>
                <li><strong>New WAXs:</strong> {_.capitalize(node.frontmatter.wax)}</li>
                <li><strong>New 3DOs:</strong> {_.capitalize(node.frontmatter.three_do)}</li>
                <li><strong>New VOCs:</strong> {_.capitalize(node.frontmatter.voc)}</li>
                <li><strong>New GMDs:</strong> {_.capitalize(node.frontmatter.gmd)}</li>
                <li><strong>New LFDs:</strong> {_.capitalize(node.frontmatter.lfd)}</li>
                <li><strong>New VUEs:</strong> {_.capitalize(node.frontmatter.vue)}</li>
                <li><strong>Base:</strong> {node.frontmatter.base}</li>
                <li><strong>Editor(s):</strong> {node.frontmatter.editors}</li>
            </ul>
        </div>
    )
}