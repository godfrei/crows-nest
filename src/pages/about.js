import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import { Link } from 'gatsby';
import config from "../../data/SiteConfig";

const AboutPage = () => (
  <Layout>
    <>
      <Helmet title={`About | ${config.siteTitle}`} />
      
      <h1>About the Nest</h1>

      <p>The Crow's Nest is a celebration of the LucasArts first-person shooter <em>Dark Forces</em>, focused on reviewing the add-on missions created by the online community. Here you'll also find general information <Link to="/database">about the game</Link>, <Link to="/database/running-add-ons">instructions for running the missions</Link>, and many of the <Link to="/storage">custom components</Link> created for building new missions.</p>

      <img src="/images/crows-nest-97.jpg" alt="Recreation of roughly what the Crow's Nest looked like in 1997." />

      <p>The Nest began life in 1996 as a way for me (Geoff Elliott) to share my love of Dark Forces. I was a year into a job building websites, excited about this new world-spanning thing and eager to build something of my own. When the university I was attending presented me with free web hosting it was too good an opportunity to pass up.</p>

      <p>I took inspiration from the Dark Forces sites I'd been enjoying since I first got on the web, places like Tola Daltons' Dark Forces Homepage, Admiral Ackbar's and MagicAl's sites, and wanted to find a way I could add something unique to the community. At the time there were plenty of new missions available to play, but it was hard to know whether any given mission was going to be a masterpiece or... not. And dealing with a dial-up connection in those days meant that every download was a commitment. So I hit on the idea of reviewing missions to help others out.</p>

      <p>Why anyone would listen to my opinion on the quality of these missions is still a mystery, but I became friends with mission authors on continents across the world. When the site eventually stopped getting updates (college life became more important) others thought it was worth preserving and sites like swgamers.com and later df-21.net kept a shadow copy of the Nest alive.</p>

      <p>Several times over the years I've thought about re-working the content with a more current presentation, but those ideas never progressed beyond Photoshop mockups. But now, almost 25 years later, The Crow's Nest is back.</p>
    </>
  </Layout>
);

export default AboutPage;
