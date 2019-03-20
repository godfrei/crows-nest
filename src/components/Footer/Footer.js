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

                <p><small><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span property="dct:title">The Crow's Nest</span> by <span property="cc:attributionName">Geoff Elliott</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</small></p>
            </div>
        </footer>
    )
}