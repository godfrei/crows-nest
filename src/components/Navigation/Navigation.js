import React from "react"
import { Link } from "gatsby"
import navStyles from "./navigation.module.scss"
import launchPad from "../../images/launch_pad.png"
import reviewList from "../../images/reviews.png"
import storage from "../../images/storage.png"
import database from "../../images/database.png"

export default () => {
    return (
        <nav className={navStyles.navigation}>
            <ul> 
                <li className="review_link">
                    <Link to="/reviews/">
                        <img src={reviewList} alt="" />
                        <span>Reviews</span>
                    </Link>
                </li>
                <li className="storage_link">
                    <Link to="/storage">
                        <img src={storage} alt="" />
                        <span>Storage</span>
                    </Link>
                </li>
                <li className="launchpad_link">
                    <Link to="/launchpad">
                        <img src={launchPad} alt="" />
                        <span>Launch Pad</span>
                    </Link>
                </li>
                <li className="database_link">
                    <Link to="/database">
                        <img src={database} alt="" />
                        <span>Database</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}