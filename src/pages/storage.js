import React from "react"
import { Link } from "gatsby"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import storage from "../images/storage.png"

export default () => (
  <BodyClassName className="storage">
    <Layout>
      <img src={storage} alt="" className="section_icon" />
      <h1 className="gradient-glow" data-text="Storage">Storage</h1>
      <p>Files to come.</p>
      <Link to="/missions/">Missions</Link>
    </Layout>
  </BodyClassName>
)