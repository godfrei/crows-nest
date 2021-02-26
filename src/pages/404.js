import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout/index'
import config from '../../data/SiteConfig'

const NotFoundPage = () => (
  <Layout>
    <main>
      <Helmet title={`You're not allowed here! | ${config.siteTitle}`} />
      <h1>You're not allowed here!</h1>
      <img src="../images/trooper_sprite.png" />
      <p>...because there's nothing here to see.</p>
    </main>
  </Layout>
)

export default NotFoundPage
