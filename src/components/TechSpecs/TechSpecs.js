import React from "react"
import _ from "lodash"
import techStyles from './techspecs.module.scss'
import checkmark from '../../images/checkmark.png'
import blank from '../../images/blank.gif'

export default ({ node }) => {
    function checkMarkOrNot(value) {
        let checkMark = (<img src={blank} alt="No" />)
        if(value === "yes") {
            checkMark = (<img src={checkmark} alt="Yes" />)
        }
        return checkMark
    }

    return(
        <aside className={techStyles.techspecs}>
            <h2>Tech Specs</h2>
            <ul>
                <li><strong>Level(s) Replaced:</strong> {node.frontmatter.levelReplaced}</li>
                <li><strong>Base:</strong> {node.frontmatter.base}</li>
                <li><strong>Editor(s):</strong> {node.frontmatter.editors}</li>
                <li><strong>Difficulty Settings:</strong> {_.capitalize(node.frontmatter.difficulty)}</li>
            </ul>

            <h3>New Stuff</h3>
            <ul className={techStyles.components}>
                <li>{checkMarkOrNot(node.frontmatter.bm)} <strong>BM</strong> </li>
                <li>{checkMarkOrNot(node.frontmatter.fme)} <strong>FME</strong> </li>
                <li>{checkMarkOrNot(node.frontmatter.wax)} <strong>WAX</strong> </li>
                <li>{checkMarkOrNot(node.frontmatter.wax)} <strong>3DO</strong> </li>
                <li>{checkMarkOrNot(node.frontmatter.wax)} <strong>VOC</strong></li>
                <li>{checkMarkOrNot(node.frontmatter.wax)} <strong>GMD</strong></li>
                <li>{checkMarkOrNot(node.frontmatter.wax)} <strong>LFD</strong></li>
                <li>{checkMarkOrNot(node.frontmatter.wax)} <strong>VUE</strong></li>
            </ul>
        </aside>
    )
}