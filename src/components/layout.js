import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Navigation from "./Navigation"
import crow from "../images/crow.png"
import GradientTitle from "./GradientTitle";
import Footer from "./Footer";

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
                    <div className="site_title">
                        <Link to="/">
                            <img src={crow} alt="The Moldy Crow" id="crow" />
                            <GradientTitle title={data.site.siteMetadata.title} />
                        </Link>
                    </div>
                    <Navigation />

                </header>
                {children}
                <Footer />
            </main>
        )}
    />
)