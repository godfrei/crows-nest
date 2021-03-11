import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import MissionListing from '../components/MissionListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import GradientTitle from "../components/GradientTitle"
import reviewList from "../images/reviews.png"

const Missions = ({ data }) => (
  <Layout>
    <Helmet title={`Missions | ${config.siteTitle}`} />
    <SEO />
    <img src={reviewList} alt="" className="section_icon" />
    <GradientTitle title="Missions" />
    Sort: <Link to="/missions">Alphabetical</Link> | 
      <Link to="/missions/rating">Rating</Link> | 
      <Link to="/missions/date">Date</Link>
    <MissionListing missionEdges={data.allMarkdownRemark.edges} />
  </Layout>
)

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
        fileAbsolutePath: { regex: "/missions\/.*\/index/" }
      }
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          frontmatter {
            title
            cover {
              name
              publicURL
            }
            date
          }
        }
      }
    }
  }
`
