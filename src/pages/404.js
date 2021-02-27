import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout/index'
import config from '../../data/SiteConfig'
import trooper from '../images/trooper_sprite.png'

const NotFoundPage = () => (
  <Layout>
    <main>
      <Helmet title={`You're not allowed here! | ${config.siteTitle}`} />
      <h1>You're not allowed here!</h1>
      <img src={trooper} alt="Stormtropper pointing his blaster at you." />
      <p>...because there's nothing here to see.</p>
    </main>
  </Layout>
)

export default NotFoundPage
