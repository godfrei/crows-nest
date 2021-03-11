import React from "react"
import { Link } from "gatsby"
import { active, navigation } from "./navigation.module.scss"
import launchPad from "../../images/launch_pad.png"
import reviewList from "../../images/reviews.png"
import storage from "../../images/storage.png"
import database from "../../images/database.png"

export default () => {
    const linkProps = {
        activeClassName: active,
        partiallyActive: true
    }
    return (
        <nav className={navigation}>
            {/* <ul> 
                <li className="review_link">
                    <Link to="/missions/" {...linkProps}>
                        <img src={reviewList} alt="" />
                        <span>Missions</span>
                    </Link>
                </li>
                <li className="storage_link">
                    <Link to="/storage" {...linkProps}>
                        <img src={storage} alt="" />
                        <span>Storage</span>
                    </Link>
                </li>
                <li className="launchpad_link">
                    <Link to="/launchpad" {...linkProps}>
                        <img src={launchPad} alt="" />
                        <span>Launch Pad</span>
                    </Link>
                </li>
                <li className="database_link">
                    <Link to="/database" {...linkProps}>
                        <img src={database} alt="" />
                        <span>Database</span>
                    </Link>
                </li>
            </ul> */}
            <ul>
                <li>
                    <Link to="/blog" {...linkProps}>Blog</Link>
                </li>
                <li>
                    <Link to="/missions" {...linkProps}>Missions</Link>
                </li>
                <li>
                    <Link to="/database" {...linkProps}>Database</Link>
                </li>
                <li>
                    <Link to="/storage" {...linkProps}>Files</Link>
                </li>
            </ul>
        </nav>
    )
}