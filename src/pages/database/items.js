import React from "react";
import Helmet from "react-helmet";
import config from "../../../data/SiteConfig";
import Layout from "../../layout";
import DatabaseLayout from "../../layout/database";
import ItemsLayout from "../../layout/items";

const Items = () => (
  <Layout>
    <Helmet>
      <title>Items | {config.siteTitle}</title>
    </Helmet>

    <DatabaseLayout>
      <ItemsLayout>
        <article>
          <h1>Items</h1>

          <p>Lots of stuff to pick up. Learn about it.</p>
        </article>
      </ItemsLayout>
    </DatabaseLayout>
  </Layout>
);

export default Items;
