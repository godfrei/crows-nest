import React from "react"
import { Link } from "gatsby"
import _ from "lodash"
import EditorsChoice from "../EditorsChoice"
import headerStyles from "./missionheader.module.scss"

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
        <header className={headerStyles.header}>
            <div className={`content ${headerStyles.content}`}>
                <div className={headerStyles.headGroup}>
                    <h1>{ node.frontmatter.title }</h1>
                    Author(s): { node.frontmatter.authors.map((author, index) => {
                        return (
                        <>
                            { (index >=1) ? `, ` : `` }
                            <Link to={`/authors/${_.kebabCase(author)}`}>{author}</Link>
                        </>
                        )
                    })}
                </div>
                <div className={headerStyles.awards}>
                    {getEditorsChoice(node)}
                </div>
            </div>
        </header>
    )
}