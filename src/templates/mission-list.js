import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../layout";
import MissionListing from "../components/MissionListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import {
  active,
  pageHeader,
  sortOptions,
  missionListHeader,
  description,
  cover,
} from "./mission-list.module.scss";

const Missions = ({ data }) => {
  const linkProps = {
    activeClassName: active,
    partiallyActive: true,
  };

  return (
    <Layout>
      <Helmet title={`Missions | ${config.siteTitle}`} />
      <SEO />
      <div className={`${pageHeader} ${missionListHeader}`}>
        <StaticImage src="../../static/images/briefing.jpg" alt="A photo of the briefing room before the Battle of Endor, with Mon Mothma describing the mission at hand." className={cover} loading="eager" />
        <div className={description}>
          <h1>Missions</h1>

          <p>
            For years independent creators have expanded on the original levels
            in <em>Dark Forces</em>, using community-developed tools to
            construct their own missions to continue the story of Kyle Katarn
            (and others!). These missions sometimes went well beyond what
            LucasArts produced and are a great showcase of the talent and
            creativity that lives in the DF community.
          </p>

          <p>
            Below you'll find a collection of those missions, most of them
            available to download and many with reviews to help you find the
            very best. More reviews will show up over time.
          </p>
        </div>
        <div className={sortOptions}>
          Sort by:{" "}
          <ul>
            <li>
              <Link to="/missions/" activeClassName={active}>
                Title
              </Link>{" "}
            </li>
            <li>
              <Link to="/missions/rating/" {...linkProps}>
                Rating
              </Link>{" "}
            </li>
            <li>
              <Link to="/missions/date/" {...linkProps}>
                Date
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <MissionListing missionNodes={data.allMissionsJson.nodes} />
    </Layout>
  );
};

export default Missions;

/* eslint no-undef: "off" */
export const missionsQuery = graphql`
  query MissionsQuery($sort: MissionsJsonSortInput) {
    allMissionsJson(limit: 1000, sort: $sort) {
      nodes {
        slug
        title
        authors
        description
        editorsChoice
        reviews {
          frontmatter {
            rating
          }
        }
        cover {
          publicURL
        }
      }
    }
  }
`;
