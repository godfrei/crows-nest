import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ReviewCard from "../ReviewCard";
import { reviewGrid } from "./ReviewListing.module.scss";

const ReviewListing = () => {
  const data = useStaticQuery(graphql`
    query ReviewQuery {
      allMarkdownRemark(
        limit: 4
        filter: { frontmatter: { mission: { id: { ne: null } } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            authors
            mission {
              slug
              title
              cover {
                publicURL
              }
            }
            rating
            date
          }
          excerpt
        }
      }
    }
  `);

  return (
    <ul className={reviewGrid}>
      {data.allMarkdownRemark.nodes.map((review) => {
        return (
          <li>
            <ReviewCard review={review} />
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewListing;
