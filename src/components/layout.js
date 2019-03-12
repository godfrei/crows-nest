import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import crow from "../images/crow.png"
import launchPad from "../images/launch_pad.png"
import reviewList from "../images/reviews.png"
import storage from "../images/storage.png"
import database from "../images/database.png"

export default ({ children }) => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <main>
                <header>
                    <Link to="/">
                        <img src={crow} alt="The Moldy Crow" id="crow" />
                        <h1 className="gradient-glow" data-text={data.site.siteMetadata.title}>
                            {data.site.siteMetadata.title}
                        </h1>
                    </Link>
                </header>
                {children}
                <nav id="site_navigation">
                    <ul>
                        <li className="home_link">
                            <Link to="/">
                                <img src={crow} alt="" />
                                <span>Home</span>
                            </Link>
                        </li>   
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
            </main>
        )}
    />
)