import React from "react"
import footerStyles from "./footer.module.scss"

export default () => {
    return (
        <footer className={footerStyles.footer}>
            <div className="content">
                <ul>
                    <li>About</li>
                    <li>Social Links</li>
                    <li>Etc</li>
                </ul>
            </div>
        </footer>
    )
}