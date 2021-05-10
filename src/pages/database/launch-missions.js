import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO";
import Layout from "../../layout";

const LaunchMissions = () => (
  <Layout>
    <Helmet>
      <title>Launch Custom Missions | {config.siteTitle}</title>
    </Helmet>
    <SEO />
    <div className="text">
      <article>
        <h1>Launch Custom Missions</h1>

        <p>You say you've finished the storyline of Dark Forces, defeated General Mohc and the Dark Troopers, and you're looking for more action? Not sure where to turn next? The Dark Forces community has put together literally hundreds of <Link to="/missions/">new missions</Link> that you can download and run.</p>

        <p>Launching these missions can be a bit confusing if you didn't grow up in the days of DOS gaming. But never fear! This guide will step you through the process and you'll be blasting stormtroopers in no time.</p>

        <p>This assumes that you're running the game in DOSBOX, and that you've successfully mounted the install directory and CD drive. If you've downloaded the game via Steam or some other game service I'm not sure how to help you, but I bet some benevolent individual will chime in to provide some answers.</p>

        <ol>
            <li>
                <p>Unzip the mission you want to run and place it in your Dark Forces directory (often C:\DARK)</p>
            </li>

            <li>
                <p>Many of the more recent missions include a .BAT file for launching the custom content. If it does, use it! Just make sure all the files from the .ZIP file are located in the same directory.</p>
            </li>

            <li>
                <p>If the mission does not contain a .bat file, place the .gob file in the Dark Forces directory and then launch the game using the following command:</p>

                <code>DARK -ufilename.gob</code>

                <p>That means if you're trying to run a file named "crowsnest.gob" from the C:\DARK directory you'll have:</p>

                <code>C:\DARK\DARK -ucrowsnest.gob</code>

                <p>This will start up Dark Forces and the new mission will replace whichever one is specified (usually SECBASE). Unless the author tells you differently in the text file, this should work for almost every mission you download.</p>
            </li>
        </ol>

      </article>
    </div>
  </Layout>
);

export default LaunchMissions;
