import React from 'react'
import { Link } from 'gatsby'
import config from '../../../data/SiteConfig'
import Navigation from '../Navigation'
import GradientTitle from '../GradientTitle'
import crow from '../../images/crow.png'
import styles from './Header.module.scss'

const Header = () => (
  <header className={styles.header}>
    <div>      
      <Link to="/" className={styles.title}>
        <img src={crow} alt="The Moldy Crow" id="crow" />
        <GradientTitle title={config.siteTitle} />
        {/* <h1>{config.siteTitle}</h1> */}
      </Link>
      <Navigation />
      {/* <Search /> */}
    </div>
  </header>
)

export default Header
