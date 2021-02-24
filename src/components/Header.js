import React from 'react'
import { Link } from 'gatsby'
import config from '../../data/SiteConfig'
import Navigation from '../components/Navigation'
import GradientTitle from '../components/GradientTitle'
import crow from '../images/crow.png'

const Header = () => (
  <header className="nestHeader">
    <div className="site_title">
      <Link to="/">
          <img src={crow} alt="The Moldy Crow" id="crow" />
          <GradientTitle title={config.siteTitle} />
      </Link>
    </div>
    <Navigation />
    {/* <Search /> */}
  </header>
)

export default Header
