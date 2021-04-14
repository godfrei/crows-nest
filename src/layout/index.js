import React from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Header from "../components/Header";
import config from "../../data/SiteConfig";
import * as styles from "../styles/main.scss";

const MainLayout = ({ children }) => (
  <>
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <meta name="description" content={config.siteDescription} />
    </Helmet>
    <Header />
    <div className="cn-layout">
      <div className="glow"></div>
      <main>{children}</main>
    </div>
    <Footer />

  </>
);

export default MainLayout;
