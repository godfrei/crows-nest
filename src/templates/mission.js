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
import { mission, missingFile, download, descAndReviews, plot, coverImage } from './mission.module.scss';

export default ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;

  const reviews = (data.allMarkdownRemark) ? data.allMarkdownRemark.edges : []

  const captures = data?.allScreenshots?.nodes[0]?.captures || [];

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
    const file = data?.allFile?.edges[0]?.node || null;
    // const filename = data.markdownRemark.frontmatter.filename;
    const title = data.markdownRemark.frontmatter.title;

    if(file) {
      return (
        <a href={file.publicURL} className={download}>
          <strong>Download <span className="sr-only">{title}</span></strong>
          ({`${file.name}.${file.extension}`}, {file.prettySize})
        </a>
      )
    }
    else {
      return (
        <div className={missingFile}>
          <strong>File Missing</strong>
          <p>Do you have a copy of this mission? <a href="mailto:godfrei@gmail.com">Let us know!</a></p>
        </div>
      );
    }
  }

  console.log(data);
  const cover = data.markdownRemark.frontmatter.cover ? data.markdownRemark.frontmatter.cover.publicURL : '';
  console.log(cover);

  if (!post.id) {
    post.id = slug
  }
  return (
    <Layout>
      <Helmet>
        <title>Mission {`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div className={coverImage} style={{ backgroundImage: `url(${cover})` }}></div>
      <div className={mission}>
        <MissionHeader node={postNode} />
        <div className="content">
          <div className={descAndReviews}>
            <h2>Plot</h2>
            <p className={plot}>{post.description}</p>
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
  query MissionBySlug($slug: String!, $fileRegex: String!) {
    allMissionsJson(filter: {slug: {eq: $slug} }) {
      nodes {
        title
        date
        slug
        editorsChoice
        cover
        description
        authors
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
        reviews {
          html
          frontmatter {
            rating
            reviewers
            date
          }
        }
        screenshots {
          caption
          file {
            publicURL
          }
        }
      }
    }
    allFile(filter: {publicURL: {regex: $fileRegex}}) {
      edges {
        node {
          extension
          name
          publicURL
          prettySize
        }
      }
    }
  }
`
