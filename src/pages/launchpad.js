import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import LaunchPad from '../components/LaunchPad'
import config from '../../data/SiteConfig'
import GradientTitle from "../components/GradientTitle"
import launchPad from "../images/launch_pad.png"

const LaunchpadPage = () => (
  <Layout>
    <main>
      <Helmet title={`Launch Pad | ${config.siteTitle}`} />
      <img src={launchPad} alt="" className="section_icon" />
      <GradientTitle title="Launch Pad" />
      <LaunchPad />
    </main>
  </Layout>
)

export default LaunchpadPage
