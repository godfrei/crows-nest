import React from "react"
import _ from "lodash"
import { techspecs, components } from './TechSpecs.module.scss'
import checkmark from '../../images/checkmark.png'
import blank from '../../images/blank.gif'

export default ({ node }) => {
    function checkMarkOrNot(value) {
        let checkMark = (<img src={blank} alt="No new" />)
        if(value === "yes") {
            checkMark = (<img src={checkmark} alt="New" />)
        }
        return checkMark
    }

    return(
        <aside className={techspecs}>
            <h2>Tech Specs</h2>
            <ul>
                <li><strong>Level(s) Replaced:</strong> {node.levelReplaced}</li>
                <li><strong>Base:</strong> {node.base}</li>
                <li><strong>Editor(s):</strong> {node.editors}</li>
                <li><strong>Difficulty Settings:</strong> {_.capitalize(node.difficulty)}</li>
            </ul>

            <h3>New Stuff</h3>
            <ul className={components}>
                <li>{checkMarkOrNot(node.bm)} <strong>BM</strong> </li>
                <li>{checkMarkOrNot(node.fme)} <strong>FME</strong> </li>
                <li>{checkMarkOrNot(node.wax)} <strong>WAX</strong> </li>
                <li>{checkMarkOrNot(node.three_do)} <strong>3DO</strong> </li>
                <li>{checkMarkOrNot(node.voc)} <strong>VOC</strong></li>
                <li>{checkMarkOrNot(node.gmd)} <strong>GMD</strong></li>
                <li>{checkMarkOrNot(node.lfd)} <strong>LFD</strong></li>
                <li>{checkMarkOrNot(node.vue)} <strong>VUE</strong></li>
            </ul>
        </aside>
    )
}
