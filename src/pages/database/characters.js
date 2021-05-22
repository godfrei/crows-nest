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

        <img src="/images/characters/kyle-katarn.png" alt="Kyle Katarn as he appears in the game, his face stern while listening to a briefing from Mon Mothma." />

        <p>Our hero, and the man you'll be playing with throughout the game (and most of the <Link to="/missions/">custom missions</Link> as well. Kyle was an imperial officer before he became dismayed with the Empire's mission and left. Now he operates as an independent contractor, sometimes doing work for the Rebellion.</p>

        <h2>Jan Ors</h2>

        <img src="/images/characters/jan-ors.png" alt="Jan Ors as she appears in the game, standing with hands on hips." />

        <p>Jan Ors is your right-hand, pilot, and partner. She'll brief you on each mission, drop you off and pick you back up in the Moldy Crow.</p>

        <h2>Mon Mothma</h2>

        <img src="/images/characters/mon-mothma.png" alt="Mon Mothma as she appears in the game, awarding a medal to Kyle Katarn." />

        <p>The leader of the Rebellion against the Empire, Mon Mothma will give you the missions to capture the Death Star plans and sets you off to discover what new weapon the Empire has devised.</p>

        <h2>Darth Vader</h2>

        <img src="/images/characters/vader.png" alt="Darth Vader as he appears in the game." />

        <p>The Dark Lord of the Sith hovers in the periphery, at first impressed with the new soldiers Mohc has created but growing ever more skeptical as Kyle starts to dismantle the Dark Trooper project.</p>

        <h2>General Mohc</h2>

        <img src="/images/characters/mohc.png" alt="General Mohc as he appears in the game." />

        <p>Creator of the Dark Trooper project, General Mohc believes that superweapons such as the Death Star are incapable of bringing true victory because of their remove from personal conflict.</p>

        <h2>Moff Reebus</h2>

        <img src="/images/characters/mof-rebus.png" alt="Moff Rebus as he appears in the game, seated holding a blaster rifle." />

        <h2>Crix Madine</h2>

        <img src="/images/characters/crix-madine.png" alt="Crix Madine as he appears in the game, standing with his hands secured in front of him." />

        <p>An Imperial Officer turned informant, Crix Madine has information about the Dark Trooper project that he is trying to get to the Rebellion.</p>

        <h2>Boba Fett</h2>

        <h2>Jabba the Hutt</h2>

        <img src="/images/characters/jabba.png" alt="Jabba the Hutt as he appears in the game, a hologram projection." />

        <p>Jabba doesn't really have a side in this fight, but he goes where the money is good and General Mohc and the Empire are paying.</p>

      </article>
    </div>
  </Layout>
);

export default Characters;
