import React from "react"
import { Link } from "gatsby"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import GradientTitle from "../components/GradientTitle"
import storage from "../images/storage.png"

export default () => (
  <BodyClassName className="storage">
    <Layout>
      <img src={storage} alt="" className="section_icon" />
      <GradientTitle title="Storage" />
      <p>Files to come.</p>
      <Link to="/missions/">Missions</Link>
    </Layout>
  </BodyClassName>
)