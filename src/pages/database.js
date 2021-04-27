import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO";
import Layout from "../layout";
import { pageHeader, databaseHeader, description, info, play, build } from "./Database.module.scss";
// import GradientTitle from "../components/GradientTitle"
// import database from "../images/database.png"

const Database = () => (
  <Layout>
    <Helmet>
      <title>Database | {config.siteTitle}</title>
    </Helmet>
    <SEO />
    <div className={`${pageHeader} ${databaseHeader}`}>
      <div className={description}>
        <h1>Database</h1>

        <p>
          Information about <em>Dark Forces</em>, how to play it, and how to build for it.
        </p>
      </div>
    </div>

    <section className={info}>
      <h2>Info</h2>

      <p>Learn about the game.</p>

      <Link to="/database/history/">Dark Forces History</Link>
      <Link to="/database/characters/">Characters</Link>
      <Link to="/database/weapons/">Weapons</Link>
      <Link to="/database/enemies/">Enemies</Link>
      <Link to="/database/items/">Items</Link>
    </section>

    <section className={play}>
      <h2>Play</h2>

      <p>Everything you need to step into Kyle Katarn's boots and start blasting stormtroopers.</p>

      <Link to="/database/demo/">Demo</Link>
      <Link to="/database/get-dark-forces">Get Dark Forces</Link>
      <Link to="/database/launch-missions/">Launch Custom Missions</Link>
      <Link to="/database/cheats/">Cheat Codes</Link>
    </section>

    <section className={build}>
      <h2>Build</h2>

      <p>Get started building your own Dark Forces missions or components.</p>

      <Link to="/database/tools/">Tools</Link>
      <Link to="/database/specs/">Tech Specs</Link>
    </section>
  </Layout>
);

export default Database;
