import React from "react"
import { Link, graphql, withPrefix } from "gatsby"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"
import Review from "../components/Review"
import TechSpecs from "../components/TechSpecs"
import MissionHeader from "../components/MissionHeader"

export default ({ pageContext, data }) => {
  console.log(data)

  function getReviewContent(reviews) {
    let reviewContent = null
    if(reviews.length >= 1) {
      reviewContent = (
        <div>
          <h2>Review</h2>
          {reviews.map(({ node }) => {
            return (
              <Review key={node.id} node={node} />
            )
          })}
        </div>
      )
    }
    return reviewContent
  }

  const post = data.markdownRemark
  const reviews = (data.allMarkdownRemark) ? data.allMarkdownRemark.edges : []
  const heroImage = (post.frontmatter.heroImage) ? post.frontmatter.heroImage.publicURL : "";
  const hasHeroImage = (post.frontmatter.heroImage) ? "hasHeroImage" : "";
  return (
    <Layout>
      <Helmet>
        <title>{`${post.frontmatter.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <div className={`mission ${hasHeroImage}`}>
        <div className="heroImage" style={{ backgroundImage: `url(${heroImage})`}} />
        <MissionHeader node={post} />
        <div className="content">
          <div className="descAndReviews">
            <h2>Plot</h2>
            <p className="plot">{post.frontmatter.description}</p>
            {getReviewContent(reviews)}
          </div>
          <div className="supplemental">
            <a href={ withPrefix(`/missions/${post.frontmatter.filename}`) } className="download">
              <strong>Download {post.frontmatter.title}</strong>
              ({post.frontmatter.filename}, {data.file.prettySize}) 
            </a>
            <TechSpecs node={post} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $reviewRegex: String!, $filename: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        editorsChoice
        authors
        description
        date(formatString: "MMMM Do, YYYY")
        heroImage {
          publicURL
        }
        filename
        levelReplaced
        difficulty
        bm
        fme
        wax
        three_do
        voc
        gmd
        vue
        lfd
        base
        editors
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { 
        fields: { slug: { regex: $reviewRegex } }
      }
      sort: {
        fields: frontmatter___date
        order:ASC
      }
    ) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            reviewer
            rating
            date(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
    file(relativePath: { eq: $filename }) {
      absolutePath
      prettySize
    }
  }
`