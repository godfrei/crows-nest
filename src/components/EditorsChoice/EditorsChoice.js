import React from "react"
import { Link } from "gatsby"
import { editorsChoice } from "./editorschoice.module.scss"

export default () => (
    <Link to="/missions/editors-choice" className={editorsChoice}>
        <strong>Editors Choice</strong>
    </Link>
)