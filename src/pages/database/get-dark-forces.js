import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import config from "../../../data/SiteConfig";
import SEO from "../../components/SEO";
import Layout from "../../layout";

const GetDarkForces = () => (
  <Layout>
    <Helmet>
      <title>Get Dark Forces | {config.siteTitle}</title>
    </Helmet>
    <SEO />
    <div className="text">
      <article>
        <h1>Get Dark Forces</h1>

        <p>
          If you're looking for some retro Star Wars FPS action (and interested in running some of the custom missions available) you'll first need to snag a copy of Dark Forces. Thankfully, this celebrated title is readily available from a number of different sources.
        </p>

        <ul>
          <li>
            <strong>Original CD</strong> - If you want the authentic experience you can still find a number of original CDs, DOS or Mac, for sale on eBay and other sites. I run Dark Forces through DOSBOX on my Mac, and it still works just the way it did 26+ years ago. You may need to put in some time to configure settings just the way you want, and it's definitely not the seamless experience offered by other options.
          </li>
          <li>
            <a href="https://www.gog.com/game/star_wars_dark_forces">GOG</a> - Good Old Games has Dark Forces available and it runs in DOSBOX as well. They only mention Windows and Linux as supported operating systems, but since it's DRM-free I imagine enterprising individuals could find a way to get it working on a Mac under DOSBOX.
          </li>
          <li>
            <a href="https://store.steampowered.com/app/32400/STAR_WARS__Dark_Forces/">
              Steam
            </a> - Available for both Windows and Mac.
          </li>
          <li>
              <a href="https://www.origin.com/usa/en-us/store/star-wars/star-wars-dark-forces">Origin</a> - Windows only.
          </li>
        </ul>

        <p>Once you've got Dark Forces running and you've finished the story you might be interested in some of the <Link to="/missions/">custom missions</Link> the community has put together and learning <Link to="/database/launch-missions/">how to launch them</Link>.</p>
      </article>
    </div>
  </Layout>
);

export default GetDarkForces;
