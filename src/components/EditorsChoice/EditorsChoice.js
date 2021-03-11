import React from "react"
import { Link } from "gatsby"
import { editorsChoice } from "./editorschoice.module.scss"

export default () => (
    <Link to="/missions/editorschoice" className={editorsChoice}>
        <strong>Editors Choice</strong>
    </Link>
)