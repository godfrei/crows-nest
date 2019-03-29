import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Navigation from "./Navigation"
import Search from "./Search"
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
            <>
                <Helmet>
                    <meta name="description" content={config.siteDescription} />
                </Helmet>
                <header className="nestHeader">
                    <div className="site_title">
                        <Link to="/">
                            <img src={crow} alt="The Moldy Crow" id="crow" />
                            <GradientTitle title={data.site.siteMetadata.title} />
                        </Link>
                    </div>
                    <Navigation />
                    <Search />
                </header>
                <main>
                    {children}
                </main>
                <Footer />
            </>
        )}
    />
)