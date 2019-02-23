import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

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
                <h1>{data.site.siteMetadata.title}</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>   
                        <li><Link to="/reviews/">Reviews</Link></li>
                        <li><Link to="/launchpad">Launch Pad</Link></li>
                        <li><Link to="/database">Database</Link></li>
                        <li><Link to="/storage">Storage</Link></li>
                    </ul>
                </nav>
                {children}
            </main>
        )}
    />
)