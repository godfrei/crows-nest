import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO";
import Layout from "../../layout";

const Characters = () => (
  <Layout>
    <Helmet>
      <title>Characters | {config.siteTitle}</title>
    </Helmet>
    <SEO />
    <div className="text">
      <article>
        <h1>Characters</h1>

        <p>The characters of Dark Forces are what sets it apart from other FPS games of the era (and from other Star Wars games of the time as well). Rather than a nameless warrior (or worse, Rookie One) Dark Forces features a hero with a backstory and weaves new faces and established in-universe characters together to give us a unique Star Wars experience.</p>

        <p>Here's a little bit about the characters you'll encounter throughout the game.</p>

        <h2>Kyle Katarn</h2>

        <h2>Jan Ors</h2>

        <h2>Mon Mothma</h2>

        <h2>Darth Vader</h2>

        <h2>General Mohc</h2>

        <h2>Moff Reebus</h2>

        <h2>Crix Madine</h2>

        <h2>Boba Fett</h2>

        <h2>Jabba the Hutt</h2>

      </article>
    </div>
  </Layout>
);

export default Characters;
