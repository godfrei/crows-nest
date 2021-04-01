import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import MissionListing from '../components/MissionListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import { active } from './mission-list.module.scss';

function averageRating(mission) {
  if(mission.reviews.length <= 0) return 0;
  let ratingTotal = 0;
  let numberOfReviews = 0;
  mission.reviews.forEach(review => {
    if(typeof review.frontmatter.rating === "number") {
      ratingTotal += review.frontmatter.rating;
      numberOfReviews++;
    }
  });
  if(numberOfReviews === 0) return 0;
  return Math.round(ratingTotal / numberOfReviews);
}

const Missions = ({ data, pageContext }) => {
  console.log(data);
  const linkProps = {
    activeClassName: active,
    partiallyActive: true
  }

  return (
  <Layout>
    <Helmet title={`Missions | ${config.siteTitle}`} />
    <SEO />
    <h1>Missions</h1>
    <p>
      Sort by: <Link to="/missions" activeClassName={active}>Title</Link> | 
      <Link to="/missions/rating" { ...linkProps}>Rating</Link> | 
      <Link to="/missions/date" { ...linkProps}>Date</Link>
    </p>

    <MissionListing missionNodes={data.allMissionsJson.nodes} />
  </Layout>
)}

export default Missions

/* eslint no-undef: "off" */
export const missionsQuery = graphql`
  query MissionsQuery {
    allMissionsJson {
      nodes {
        slug
        title
        authors
        description
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
`
