import React from "react"
import EditorsChoice from "../EditorsChoice"
import AuthorLinks from "../AuthorLinks"
import { header, content, headGroup, awards, headerCode } from "./missionheader.module.scss"

export default ({ node }) => {

    function getEditorsChoice(node) {
        let editorsChoice = null
        if(node.frontmatter.editorsChoice === "yes") {
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
                    <span className={headerCode}>{node.frontmatter.title}</span>
                    <h1>{ node.frontmatter.title }</h1>
                    <AuthorLinks node={node} />
                </div>
                <div className={awards}>
                    {getEditorsChoice(node)}
                </div>
            </div>
        </header>
    )
}