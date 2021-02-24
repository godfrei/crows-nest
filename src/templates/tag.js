import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import config from '../../data/SiteConfig'

const TagTemplate = ({ data, pageContext }) => (
  <Layout>
    <Helmet
      title={`Posts tagged as "${pageContext.tag}" | ${config.siteTitle}`}
    />
    <PostListing postEdges={data.allMarkdownRemark.edges} />
  </Layout>
)
export default TagTemplate

// /* eslint no-undef: "off" */
// export const pageQuery = graphql`
//   query TagPage($tag: String) {
//     allMarkdownRemark(
//       limit: 1000
//       sort: { fields: [fields___date], order: DESC }
//       filter: { frontmatter: { tags: { in: [$tag] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//             date(formatString: "MMMM DD, YYYY")
//           }
//           excerpt
//           frontmatter {
//             title
//             cover {
//               name
//               publicURL
//             }
//             date
//           }
//         }
//       }
//     }
//   }
// `
