import React from "react";
import Helmet from "react-helmet";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { pageHeader, description, links, cover } from './launchpad.module.scss';

const LaunchpadPage = () => (
  <Layout>
    <Helmet title={`Launch Pad | ${config.siteTitle}`} />

    <div className={pageHeader}>
      <StaticImage src="../../static/images/hangar.jpg" alt="A photo of the hangar on a Calamari cruiser with Rebel fighter ships and a shuttle." className={cover} loading="eager" />
      <div className={description}>
        <h1>Launch Pad</h1>

        <p>
          If you're looking for links to other Dark Forces content around the web,
          this is the spot. Sadly, most of the other sites have, like the Nest, shut
          down in the intervening years. There are only a couple active places you
          can find active Dark Forces content.
        </p>

        <p>
          But in the spirit of documenting history there are a bunch of expired
          links here, some pointing to the Internet Archive if you want to take a
          trip down memory lane.
        </p>
      </div>
    </div>
    
    <div className={links}>

      <h2>Active Sites</h2>

      <ul>
        <li>
          <a href="https://df-21.net/">DF-21</a> - The most active community for
          Dark Forces fans. This crew is and has been carrying the torch for years
          and have a{" "}
          <a href="https://discord.gg/6T9NvMh2MC">
            <span className="sr-only">DF-21</span> Discord
          </a>
          ,{" "}
          <a href="https://www.twitch.tv/df21net/">
            <span className="sr-only">DF-21</span> Twitch
          </a>{" "}
          and{" "}
          <a href="https://www.youtube.com/channel/UCG6YzOWwemLBZrajnEmOtGQ/featured">
            <span className="sr-only">DF-21</span> YouTube
          </a>{" "}
          channels.
        </li>

        <li>
          <a href="https://theforceengine.github.io/">The Force Engine</a> - A
          project to reverse engineer the Jedi Engine used in Dark Forces (and
          Outlaws) to enable easier play on more modern systems along with a whole
          bunch of other goodies.
        </li>
      </ul>

      <h2>Vintage Sites</h2>

      <ul>
        <li>
          <a href="http://web.archive.org/web/19990209054406/http://e-reality.com/DarkForces/">
            The Dark Forces Homepage
          </a>
        </li>
        <li>
          <a href="http://web.archive.org/web/20021016152253/http://www.geocities.com/darkforces_faq/index.html">
            Dark Forces FAQList
          </a>
        </li>
        <li>
          <a href="http://web.archive.org/web/20021208070833/http://homepage.mac.com/anewmanagn/magic_al/">
            MagicAl's Dark Forces Niche
          </a>
        </li>
        <li>
          <a href="https://web.archive.org/web/19970626181405/http://www.swgamers.com/">www.swgamers.com</a>
        </li>
      </ul>
    </div>
  </Layout>
);

export default LaunchpadPage;
