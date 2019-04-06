import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import database from "../images/database.png"
import GradientTitle from "../components/GradientTitle"

export default () => (
  <Layout>
    <Helmet>
      <title>Database | {config.siteTitle}</title>
    </Helmet>
    <img src={database} alt="" className="section_icon" />
    <GradientTitle title="Database" />
    
    <h2>Dark Forces Info</h2>

    <ul>
      <li>General Info</li>
      <li>Demo</li>
      <li><Link to="/database/enemies">Enemies</Link></li>
      <li><Link to="/database/weapons">Weapons</Link></li>
      <li><Link to="/database/cheats">Cheat Codes</Link></li>
    </ul>

    <h2>Add-Ons</h2>
    
    <ul>
      <li>Code Alliance Documentation</li>
      <li>Launching Add-On Missions</li>
    </ul>


  </Layout>
)
