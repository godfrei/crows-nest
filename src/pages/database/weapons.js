import React from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";
import Layout from "../../layout";
import DatabaseLayout from "../../layout/database";
import WeaponsLayout from "../../layout/weapons";

const Weapons = () => (
  <Layout>
    <Helmet>
      <title>Weapons | {config.siteTitle}</title>
    </Helmet>

    <DatabaseLayout>
      <WeaponsLayout>
        <article>
          <h1>Weapons</h1>

          <p>
            You can't reason with Imperial troops; they won't listen to you when
            you try to convince them that dominating the galaxy is just plain
            wrong. And smugglers only care about getting to their next delivery.
            So you need some sturdy weapons to do the talking for you; a blaster
            is the universal communicator. And of course you can't use the
            weapons without something to fuel them. Thus knowledge of the
            weapons and ammunition at your disposal is a definite must when
            taking on the Empire.
          </p>

          <p>
            A lot of this information is from common knowledge on Star Wars,
            some comes from hearsay and some of it is off the top of my head. If
            I made a blatant error with the information let me know so I can
            correct it. But it should be accurate.
          </p>
        </article>
      </WeaponsLayout>
    </DatabaseLayout>
  </Layout>
);

export default Weapons;