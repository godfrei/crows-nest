import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'
import * as styles from '../styles/main.scss'

const MainLayout = ({ children }) => (
  <>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <Header />
    <div className="glow"></div>
    <main>
      {children}
    </main>
    <Footer />
  </>
)

export default MainLayout
