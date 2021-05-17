import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO";
import Layout from "../layout";
import { pageHeader, databaseHeader, description, info, play, build, grid } from "./Database.module.scss";

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

      <div className={grid}>
        <Link to="/database/characters/">
          <strong>Characters</strong>
          <p>Heros and villains you'll encounter in the story</p>
        </Link>
        <Link to="/database/enemies/">
          <img src="/images/profiles/stormtrooper.png" alt="" />
          <strong>Enemies</strong>
          <p>What you'll be using for target practice</p>
        </Link>
        <Link to="/database/weapons/">
          <img src="/images/weapons/detonator-belt.png" alt="" />
          <strong>Weapons</strong>
          <p>Everything you'll need to fight the Empire</p>
        </Link>
        <Link to="/database/items/">
          <img src="/images/items/shield.png" alt="" />
          <strong>Items</strong>
          <p>Equipment and powerups you'll use in your adventures</p>
        </Link>
      </div>
    </section>

    <section className={play}>
      <h2>Play</h2>

      <p>Everything you need to step into Kyle Katarn's boots and start blasting stormtroopers.</p>

      <div className={grid}>
        <Link to="/database/demo/">
          <img src="/images/items/death-star-plans.png" alt="" />
          <strong>Demo</strong>
          <p>Try out the first mission where you steal the Death Star plans</p>
        </Link>
        <Link to="/database/get-dark-forces">
          <img src="/images/box-cover.jpg" alt="" />
          <strong>Get Dark Forces</strong>
          <p>Purchase and download the full game and battle the Dark Trooper threat</p>
        </Link>
        <Link to="/database/launch-missions/">
          <img src="/images/reviews.png" alt="" />
          <strong>Launch Custom Missions</strong>
          <p>All you need to embark on new adventures</p>
        </Link>
        <Link to="/database/cheats/">
          <img src="/images/items/code-card.png" alt="" />
          <strong>Cheat Codes</strong>
          <p>For fun, or when you need a little help</p></Link>
      </div>
    </section>

    <section className={build}>
      <h2>Build</h2>

      <p>Get started building your own Dark Forces missions or components.</p>

      <div className={grid}>
        <Link to="/database/tools/">
          <img src="/images/items/gear.png" alt="" />
          <strong>Tools</strong>
          <p>Editors for making your own missions and components</p>
        </Link>
        <Link to="/database/specs/">
          <img src="/images/database.png" alt="" />
          <strong>Tech Specs</strong>
          <p>Dive into the details of how Dark Forces works</p>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Database;
