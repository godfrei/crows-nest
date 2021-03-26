import React from "react"
import Helmet from "react-helmet"
import config from "../../../data/SiteConfig"
import SEO from '../../components/SEO'
import SpecNav from '../../components/SpecNav'
import Layout from "../../layout"
import DatabaseLayout from '../../layout/database';

export default () => (
  <Layout>
    <Helmet>
      <title>Dark Forces Unofficial Specifications | {config.siteTitle}</title>
    </Helmet>
    <SEO />

    <DatabaseLayout>
      <article>
        <h1>Dark Forces Unofficial Specifications</h1>

        <p>The Dark Forces Unofficial Specifications were the guidebook for mission authors for years. The Code Alliance, with some input from developers from LucasArts, dug into the game files to document how the Jedi engine worked and how the community could build missions of their own.</p>

        <p>Yves, Jereth, Alexei, David and the other credited authors deserve all the accolades for this work. But like a lot of the classic Dark Forces websites, the Code Alliance pages and the spec are only available now thanks to the efforts of the Internet Archive.</p>

        <p>To preserve this work I've copied the content here, and I've updated the presentation to be more in keeping with the times. It's been 20+ years, after all. But without permission from the authors I'm reluctant to do any more than that.</p>

        <p>Please enjoy reading this piece of history. I hope the information is helpful.</p>

        <SpecNav />
      </article>
    </DatabaseLayout>
  </Layout>
)