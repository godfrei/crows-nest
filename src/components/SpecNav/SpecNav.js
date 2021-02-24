import React from "react"
import { Link } from "gatsby"
import specNavStyles from "./specnav.module.scss"

export default () => {

    return (
        <nav className={specNavStyles.specnav}>
            <strong>Specifications Navigation</strong>
            <ul>
                <li><Link to="/specs/welcome">Welcome</Link></li>
                <li><Link to="/specs/authors">Authors</Link></li>
                <li><Link to="/specs/copyrights">Copyrights</Link></li>
                <li><Link to="/specs/file-formats">File Formats</Link></li>
            </ul>
        </nav>
    )
}