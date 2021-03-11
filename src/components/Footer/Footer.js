import React from "react"
import { Link } from 'gatsby'
import config from '../../../data/SiteConfig'
import { footer, content } from "./footer.module.scss"

export default () => {
    return (
        <footer className={footer}>
            <div className={content}>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li>Social Links</li>
                    <li>
                        <a
                            href={config.siteUrl + config.siteRss}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            RSS
                        </a>
                    </li>
                </ul>

                <p><small><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span property="dct:title">{config.siteTitle}</span> by <span property="cc:attributionName">{config.userName}</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</small></p>
                <p>{config.copyright}</p>
            </div>
        </footer>
    )
}