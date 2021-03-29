import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import MissionListing from '../components/MissionListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import { active } from './mission-list.module.scss';

function averageRating(mission) {
  if(mission.node.reviews.length <= 0) return 0;
  let ratingTotal = 0;
  let numberOfReviews = 0;
  mission.node.reviews.forEach(review => {
    if(typeof review.node.frontmatter.rating === "number") {
      ratingTotal += review.node.frontmatter.rating;
      numberOfReviews++;
    }
  });
  if(numberOfReviews === 0) return 0;
  return Math.round(ratingTotal / numberOfReviews);
}

const Missions = ({ data, pageContext }) => {
  const sort = pageContext.sort;

  let missionsArray = new Array;
  data.allMarkdownRemark.missions.map(mission => {
    if(mission.edges[0].node.frontmatter.mission_id !== null) {
      missionsArray.push({
        node: {
          ...mission.edges[0].node,
          reviews: []
        }
      });
    }
  });
  data.allMarkdownRemark.reviews.map(mission => {
    mission.edges.map(review => {
      const missionIndex = missionsArray.findIndex(item => {
        if (review.node.frontmatter.missionSlug !== null) {
          return item.node.fields.slug === review.node.frontmatter.missionSlug;
        }
        return false;
      });
      if(missionIndex !== -1) {
        missionsArray[missionIndex].node.reviews.push(review);
      }
    });
  });

  switch(sort) {
    case 'date': 
      missionsArray.sort((a, b) => {
        const dateA = new Date(a.node.frontmatter.date);
        const dateB = new Date(b.node.frontmatter.date);
        if(dateA < dateB) return -1;
        if(dateA > dateB) return 1;
        return 0;
      });
      break;
    // Sort descending, highest rating first
    case 'rating':
      missionsArray.sort((a, b) => {
        const ratingA = averageRating(a);
        const ratingB = averageRating(b);
        return ratingB - ratingA;
      });
      break;
    default:
      missionsArray.sort((a, b) => {
        const titleA = a.node.frontmatter.title.toUpperCase();
        const titleB = b.node.frontmatter.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
  }

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

    <MissionListing missionEdges={missionsArray} />
  </Layout>
)}

export default Missions

/* eslint no-undef: "off" */
export const missionsQuery = graphql`
  query MissionsQuery {
    allMarkdownRemark(
      limit: 1000
      filter: {
        # Only from the missions collection
        fields: {collection: {eq: "missions"}},
      }
    ) {
      reviews: group(field: frontmatter___missionSlug) {
        edges {
          node {
            frontmatter {
              date
              rating
              missionSlug
            }
          }
        }
      }
      missions: group(field: frontmatter___mission_id) {
        edges {
          node {
            fields {
              slug
              date
            }
            frontmatter {
              mission_id
              title
              description
              authors
              cover {
                publicURL
              }
              date
            }
          }
        }
      }
    }
  }
`
