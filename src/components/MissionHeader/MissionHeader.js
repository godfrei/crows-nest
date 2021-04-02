import React from "react"
import EditorsChoice from "../EditorsChoice"
import AuthorLinks from "../AuthorLinks"
import Aurebesh from '../Aurebesh';
import { header, content, headGroup, awards } from "./missionheader.module.scss"

export default ({ node }) => {

    function getEditorsChoice(node) {
        let editorsChoice = null
        if(node.editorsChoice) {
          editorsChoice = (
            <EditorsChoice />
          )
        }
        return editorsChoice
    }

    return (
        <header className={header}>
            <div className={`content ${content}`}>
                <div className={headGroup}>
                    <h1>
                        <Aurebesh text={node.title} />
                        { node.title }
                    </h1>
                    <AuthorLinks node={node} />
                </div>
                <div className={awards}>
                    {getEditorsChoice(node)}
                </div>
            </div>
        </header>
    )
}