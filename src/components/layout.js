import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import crow from "../images/crow.png"

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
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>   
                        <li><Link to="/reviews/">Reviews</Link></li>
                        <li><Link to="/launchpad">Launch Pad</Link></li>
                        <li><Link to="/database">Database</Link></li>
                        <li><Link to="/storage">Storage</Link></li>
                    </ul>
                </nav>
            </main>
        )}
    />
)