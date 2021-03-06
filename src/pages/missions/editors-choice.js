import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../../layout";
import config from "../../../data/SiteConfig";
import MissionListing from "../../components/MissionListing";
import { pageHeader, description } from './editors-choice.module.scss';

const EditorsChoicePage = () => {
  const data = useStaticQuery(graphql`
    query ECQuery {
      allMissionsJson(filter: { editorsChoice: { eq: true } }) {
        nodes {
          slug
          title
          cover {
            publicURL
          }
          description
          date
          authors
          editorsChoice
        }
      }
    }
  `);

  return (
    <Layout>
      <Helmet title={`Editors' Choice | ${config.siteTitle}`} />
      <div className={`${pageHeader}`}>
        <div className={description}>
          <h1>Editors' Choice</h1>

          <p>
            These missions have been selected as the best-of-the-best the <em>Dark
            Forces</em> community has to offer. The authors (sometimes more than once!) crafted missions that added new experiences and new storytelling possibilities to the arsenal of community creators. We owe them a debt.
          </p>
            
          <p>The missions are presented here in alphabetical order. You can't go wrong with any of these, but I definitely recommend you play them all. </p>
        </div>
      </div>

      <MissionListing missionNodes={data.allMissionsJson.nodes} />
    </Layout>
  );
};

export default EditorsChoicePage;
