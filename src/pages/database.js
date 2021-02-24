import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import SEO from '../components/SEO'
import Layout from "../layout"
import GradientTitle from "../components/GradientTitle"
import database from "../images/database.png"

export default () => (
  <Layout>
    <main>
      <Helmet>
        <title>Database | {config.siteTitle}</title>
      </Helmet>
      <SEO />
      <img src={database} alt="" className="section_icon" />
      <GradientTitle title="Database" />
      
      <h2>Dark Forces Info</h2>

      <ul>
        <li>General Info</li>
        <li><Link to="demo">Demo</Link></li>
        <li><Link to="enemies">Enemies</Link></li>
        <li><Link to="weapons">Weapons</Link></li>
        <li><Link to="cheats">Cheat Codes</Link></li>
      </ul>

      <h2>Add-Ons</h2>
      
      <ul>
        <li><Link to="specs">Dark Forces Unofficial Specifications</Link></li>
        <li>Launching Add-On Missions</li>
      </ul>
    </main>
  </Layout>
)