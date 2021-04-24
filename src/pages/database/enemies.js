import React from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";
import Layout from "../../layout";
import DatabaseLayout from "../../layout/database";
import EnemiesLayout from "../../layout/enemies";

const Enemies = () => (
  <Layout>
    <Helmet>
      <title>Enemies | {config.siteTitle}</title>
    </Helmet>

    <DatabaseLayout>
      <EnemiesLayout>
        <article>
          <h1>Enemies</h1>

          <p>
            What would a game be without some adversaries to stand between you
            and your goals? Dark Forces has Imperials, bouty hunters, strange
            and exotic animals and droids whose sole objective is your
            destruction. So you'll want to be smart and read up on them here
            before heading out on your missions.
          </p>

          <p>
            A lot of this information is from common knowledge on Star Wars,
            some comes from hearsay and some of it is off the top of my head. If
            I made a blatant error with the information let me know so I can
            correct it. But it should be pretty accurate. The shot table at the
            bottom was compiled by Paulius Stepanas and is courtesy of the Dark
            Forces FAQList.
          </p>
        </article>
      </EnemiesLayout>
    </DatabaseLayout>
  </Layout>
);

export default Enemies;
