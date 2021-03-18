import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import TechSpecs from '../components/TechSpecs';
import MissionHeader from '../components/MissionHeader';
import Rating from '../components/Rating';
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import moment from 'moment';
import CaptureCarousel from '../components/CaptureCarousel';

export default ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;

  const reviews = (data.allMarkdownRemark) ? data.allMarkdownRemark.edges : []

  const captures = data?.allJson?.nodes[0]?.captures || [];

  function getReviewContent(reviews) {
    let reviewContent = null;
    if(reviews.length >= 1) {
      reviewContent = (
        <>
          {reviews.map(({ node }) => {
            const review = node.frontmatter;
            const date = new Date(review.date);
            const dateString = moment(date).format("MMMM DD, YYYY");

            return (
              <>
                <div>
                  <p>Reviewed by: {review.reviewers.join(', ')} | {dateString}</p>
                  <div dangerouslySetInnerHTML={{ __html: node.html }} />
                  <Rating score={review.rating} />
                </div>
                <hr />
              </>
            )
          })}
        </>
      );
    }
    else {
      reviewContent = (
        <p>No reviews yet.</p>
      )
    }
    return reviewContent
  }

  function getDownloadLink(data) {
    const file = data.markdownRemark.frontmatter.filename;
    const title = data.markdownRemark.frontmatter.title;

    if(file?.publicURL) {
      return (
        <a href={file.publicURL} className="download">
          <strong>Download <span className="sr-only">{title}</span></strong>
          {` (${file.name}.${file.extension}, ${file.prettySize})`} 
        </a>
      )
    }
    else {
      return (
        <div className="missingFile">
          <strong>File Missing</strong>
          <p>Do you have a copy of this mission? <a href="mailto:godfrei@gmail.com">Let us know!</a></p>
        </div>
      );
    }
  }

  if (!post.id) {
    post.id = slug
  }
  return (
    <Layout>
      <Helmet>
        <title>Mission {`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div className="mission">
        <MissionHeader node={postNode} />
        <div className="content">
          <div className="descAndReviews">
            <h2>Plot</h2>
            <p className="plot">{post.description}</p>
            { captures.length > 0 ? <CaptureCarousel captures={captures} /> : null }
            <h2>Review</h2>
            {getReviewContent(reviews)}
          </div>
          <div className="supplemental">
            {getDownloadLink(data)}
            <TechSpecs node={post} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query MissionBySlug($slug: String!, $reviewRegex: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        cover {
          name
          publicURL
        }
        date
        description
        authors
        filename {
          name
          extension
          prettySize
          publicURL
        }
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
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
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
            reviewers
            rating
            date
          }
        }
      }
    }
    allJson(filter: {mission: {eq: $slug}}) {
      nodes {
        mission
        captures {
          caption
          file {
            publicURL
          }
        }
      }
    }
  }
`
