import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import SEO from '../components/SEO'
import Layout from "../layout"
import GradientTitle from "../components/GradientTitle"
import storage from "../images/storage.png"

export default () => (
  <Layout>
    <main>
      <Helmet>
        <title>Storage | {config.siteTitle}</title>
      </Helmet>
      <SEO />
      <img src={storage} alt="" className="section_icon" />
      <GradientTitle title="Storage" />
      <p><Link to="/missions">Missions</Link></p>
      <p><Link to="/3dos">3DOs</Link></p>
      <p><Link to="/vocs">VOCs</Link></p>
      <p><Link to="/waxes">WAXes</Link></p>
    </main>
  </Layout>
)