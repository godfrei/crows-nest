import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import SEO from "../components/SEO";
import Layout from "../layout";
import DatabaseLayout from "../layout/database";
// import GradientTitle from "../components/GradientTitle"
// import database from "../images/database.png"

export default () => (
  <Layout>
    <Helmet>
      <title>Database | {config.siteTitle}</title>
    </Helmet>
    <SEO />
    <DatabaseLayout>
      <article>
        <h1>General Info</h1>

        <p>
          Stuff about <em>Dark Forces</em>, release, reception and where you can
          get it if you want to play.
        </p>
      </article>
    </DatabaseLayout>
  </Layout>
);
