import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import Layout from "../layout";
import TechSpecs from "../components/TechSpecs";
import MissionHeader from "../components/MissionHeader";
import RelatedMissions from "../components/RelatedMissions";
import Rating from "../components/Rating";
import config from "../../data/SiteConfig";
import moment from "moment";
import CaptureCarousel from "../components/CaptureCarousel";
import {
  mission,
  missingFile,
  download,
  descAndReviews,
  plot,
  coverImage,
  missionRating,
  meta,
  supplemental,
} from "./mission.module.scss";

const MissionTemplate = ({ data }) => {
  const missionNode = data.allMissionsJson.nodes[0];

  function getLastName(author) {
    var names = author.split(' ');
    return names[names.length - 1];
  }

  function getReviewContent(reviews) {
    let reviewContent = null;
    if (reviews.length >= 1) {
      
      reviews.sort((a, b) => {
        var nameA = getLastName(a.frontmatter.authors[0]).toUpperCase();
        var nameB = getLastName(b.frontmatter.authors[0]).toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      reviewContent = (
        <>
          {reviews.map((review) => {
            const rating = review.frontmatter.rating;
            const reviewers = review.frontmatter.authors;
            const date = new Date(review.frontmatter.date);
            const dateString = moment(date).format("MMMM DD, YYYY");

            return (
              <>
                <div>
                  <p className={meta}>
                    Reviewed by: {reviewers.join(", ")} | {dateString}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: review.html }} />
                  <Rating score={rating} className={missionRating} />
                </div>
                <hr />
              </>
            );
          })}
        </>
      );
    } else {
      reviewContent = <p>No reviews yet.</p>;
    }
    return reviewContent;
  }

  function getDownloadLink(missionNode) {
    const file = missionNode.filename || null;

    if (file) {
      return (
        <a href={file.publicURL} className={download}>
          <strong>
            Download <span className="sr-only">{missionNode.title}</span>
          </strong>
          ({`${file.name}.${file.extension}`}, {file.prettySize})
        </a>
      );
    } else {
      return (
        <div className={missingFile}>
          <strong>File Missing</strong>
          <p>
            Do you have a copy of this mission?{" "}
            <a href="mailto:godfrei@gmail.com">Let us know!</a>
          </p>
        </div>
      );
    }
  }

  const cover = missionNode.cover ? missionNode.cover.publicURL : "";
  let coverDescription = missionNode.coverAlt || null;
  if (coverDescription === null) {
    const coverScreen = missionNode.screenshots.find((element) => {
      return element.file.publicURL === cover;
    });
    coverDescription = coverScreen ? coverScreen.caption : null;
  }

  const seoNode = {
    ...missionNode,
    frontmatter: missionNode,
    coverAlt: coverDescription,
  };

  return (
    <Layout>
      <Helmet>
        <title>Mission {`${missionNode.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postNode={seoNode} postPath={missionNode.slug} postSEO />
      <div
        className={coverImage}
        style={{ backgroundImage: `url(${cover})` }}
      ></div>
      <div className={mission}>
        <MissionHeader node={missionNode} />
        <div className={descAndReviews}>
          <h2>Description</h2>
          <p className={plot}>{missionNode.description}</p>
          {missionNode.screenshots.length > 0 ? (
            <CaptureCarousel captures={missionNode.screenshots} />
          ) : null}
          <h2>Review</h2>
          {getReviewContent(missionNode.reviews)}
        </div>
        <div className={supplemental}>
          {getDownloadLink(missionNode)}
          <TechSpecs node={missionNode} />
        </div>
      </div>
      <RelatedMissions origMission={missionNode} />
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query MissionBySlug($slug: String!) {
    allMissionsJson(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        date
        slug
        filename {
          publicURL
          name
          prettySize
          extension
        }
        cover {
          publicURL
        }
        editorsChoice
        description
        authors
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
            authors
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
  }
`;

export default MissionTemplate;
