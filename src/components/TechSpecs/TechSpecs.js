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
        <div className={techStyles.techspecs}>
            <h2>Tech Specs</h2>
            <ul>
                <li><strong>Level(s) Replaced:</strong> {node.frontmatter.levelReplaced}</li>
                <li><strong>Base:</strong> {node.frontmatter.base}</li>
                <li><strong>Editor(s):</strong> {node.frontmatter.editors}</li>
                <li><strong>Difficulty Settings:</strong> {_.capitalize(node.frontmatter.difficulty)}</li>
            </ul>

            <h3>New Stuff</h3>
            <ul className={techStyles.components}>
                <li><strong>BM</strong> {checkMarkOrNot(node.frontmatter.bm)}</li>
                <li><strong>FME</strong> {checkMarkOrNot(node.frontmatter.fme)}</li>
                <li><strong>WAX</strong> {checkMarkOrNot(node.frontmatter.wax)}</li>
                <li><strong>3DO</strong> {checkMarkOrNot(node.frontmatter.three_do)}</li>
                <li><strong>VOC</strong> {checkMarkOrNot(node.frontmatter.voc)}</li>
                <li><strong>GMD</strong> {checkMarkOrNot(node.frontmatter.gmd)}</li>
                <li><strong>LFD</strong> {checkMarkOrNot(node.frontmatter.lfd)}</li>
                <li><strong>VUE</strong> {checkMarkOrNot(node.frontmatter.vue)}</li>
            </ul>
        </div>
    )
}