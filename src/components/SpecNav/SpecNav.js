import React from "react"
import { Link } from "gatsby"
import { specnav } from "./specnav.module.scss"

export default () => {

    return (
        <nav className={specnav}>
            <strong>Specifications Navigation</strong>
            <ul>
                <li><Link to="/database/specs/welcome">Welcome</Link></li>
                <li><Link to="/database/specs/authors">Authors</Link></li>
                <li><Link to="/database/specs/copyrights">Copyrights</Link></li>
                <li><Link to="/database/specs/file-formats">File Formats</Link></li>
            </ul>
        </nav>
    )
}