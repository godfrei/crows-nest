import React from "react"
import Helmet from "react-helmet"
import config from "../../../data/SiteConfig"
import SEO from '../../components/SEO'
import Layout from "../../layout"

export default () => (
  <Layout>
    <main>
      <Helmet>
        <title>Demo | {config.siteTitle}</title>
      </Helmet>
      <SEO />
      
      <h1>Demo</h1>

      <p>The demo for Dark Forces consists of the first mission of the game, in which you steal the plans for the Death Star, along with the opening and trailing cutscenes.</p>

      <p> Running the demo is easy enough on Mac or Windows using <a href="https://dosbox.com">DOSBOX</a>.</p>

      <p>The files here are linked from <a href="https://archive.org">The Internet Archive</a>.</p>

      <ul>
          <li><a href="https://archive.org/download/StarWarsDarkForces/dforces1.zip">dforces1.zip</a> (3.2M) - This is the actual demo, and the only file you need to get in order to play.</li>
          <li><a href="https://archive.org/download/StarWarsDarkForces/dforces2.zip">dforces2.zip</a> (1.1M) - The opening cutscene, including the classic Star Wars text crawl. This is optional.</li>
          <li><a href="https://archive.org/download/StarWarsDarkForces/dforces3.zip">dforces3.zip</a> (5.6M) - The cutscene that follows the first mission and sets up the story for the rest of the game. This is also optional.</li>
      </ul>
    </main>
  </Layout>
)