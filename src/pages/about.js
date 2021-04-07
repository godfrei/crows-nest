import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import About from "../components/About";
import config from "../../data/SiteConfig";

const AboutPage = () => (
  <Layout>
    <Helmet title={`About | ${config.siteTitle}`} />
    <About />
  </Layout>
);

export default AboutPage;
