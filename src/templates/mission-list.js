import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import MissionListing from '../components/MissionListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import GradientTitle from "../components/GradientTitle"
import reviewList from "../images/reviews.png"

const Missions = ({ data }) => {
  // console.log(data);

  let missionsArray = new Array;
  data.allMarkdownRemark.missions.map(mission => {
    missionsArray.push({
      ...mission.edges[0].node,
      reviews: []
    });
  });
  // console.log(missionsArray);
  data.allMarkdownRemark.reviews.map(mission => {
    console.log(mission);
    mission.edges.map(review => {
      const missionIndex = missionsArray.findIndex(item => item.frontmatter.mission_id === review.node.frontmatter.mission.frontmatter.mission_id);
      missionsArray[missionIndex].reviews.push(review);
    });
  })

  console.log(missionsArray);

  return (
  <Layout>
    <Helmet title={`Missions | ${config.siteTitle}`} />
    <SEO />
    <img src={reviewList} alt="" className="section_icon" />
    <GradientTitle title="Missions" />
    {/* Sort: <Link to="/missions">Alphabetical</Link> | 
      <Link to="/missions/rating">Rating</Link> | 
      <Link to="/missions/date">Date</Link>
    <MissionListing missionEdges={data.allMarkdownRemark.edges} /> */}
    <table>
      <thead>
        <tr>
          <th>Mission</th>
          <th></th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
      {
        missionsArray.map(mission => {
          console.log(mission);
          return (
            <tr>
              <td>
                <Link to={mission.fields.slug}>
                  <strong>{mission.frontmatter.title}</strong>
                  <div>{mission.frontmatter.authors.join(', ')}</div>
                </Link>
              </td>
              <td>
                {
                  mission.frontmatter.cover?.publicURL ? 
                    (<img src={mission.frontmatter.cover.publicURL} />)
                    : <span></span>
                }
              </td>
              <td>
                {mission.reviews.map(review => (
                  <span className="rating">{review.node.frontmatter.rating}</span>
                ))}
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  </Layout>
)}

export default Missions

/* eslint no-undef: "off" */
export const missionsQuery = graphql`
  query MissionsQuery($sort: MarkdownRemarkSortInput ) {
    allMarkdownRemark(
      limit: 2000
      sort: $sort
      filter: {
        # Only from the missions collection
        fields: {collection: {eq: "missions"}},
        # Not files that include "review" in their file path
        fileAbsolutePath: { regex: "/missions\/.*\/.*/" }
      }
    ) {
      reviews: group(field: frontmatter___mission___id) {
        edges {
          node {
            frontmatter {
              rating
              mission {
                frontmatter {
                  mission_id
                  title
                  authors
                }
              }
            }
          }
        }
      }
      missions: group(field: frontmatter___mission_id) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              mission_id
              title
              authors
              cover {
                publicURL
              }
            }
          }
        }
      }
    }
  }
`
