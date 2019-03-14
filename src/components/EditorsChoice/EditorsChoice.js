import React from "react"
import { Link } from "gatsby"
import ecStyles from "./editorschoice.module.scss"

export default () => (
    <Link to="/reviews/editorschoice" className={ecStyles.editorsChoice}>
        <strong>Editors Choice</strong>
    </Link>
)