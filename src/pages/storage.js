import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import GradientTitle from "../components/GradientTitle"
import storage from "../images/storage.png"

export default () => (
  <Layout>
    <img src={storage} alt="" className="section_icon" />
    <GradientTitle title="Storage" />
    <p>Files to come.</p>
    <Link to="/missions/">Missions</Link>
  </Layout>
)