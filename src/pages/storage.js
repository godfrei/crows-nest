import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import GradientTitle from "../components/GradientTitle"
import storage from "../images/storage.png"

export default () => (
  <Layout>
    <Helmet>
      <title>Storage | {config.siteTitle}</title>
    </Helmet>
    <img src={storage} alt="" className="section_icon" />
    <GradientTitle title="Storage" />
    <p>Files to come.</p>
    <p><Link to="/missions/">Missions</Link></p>
    <p><Link to="/3dos/">3DOs</Link></p>
    <p><Link to="/waxes/">WAXes</Link></p>
  </Layout>
)