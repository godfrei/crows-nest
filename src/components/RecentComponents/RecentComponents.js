import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ComponentListing from "../ComponentListing";

const RecentComponents = () => {
  const data = useStaticQuery(graphql`
    query ComponentQuery {
      allMarkdownRemark(
        limit: 4
        filter: { fields: { collection: { in: ["3dos", "bms", "fmes", "vocs", "waxes"] } } }
        sort: { fields: frontmatter___date, order: DESC }
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
                    description
                    cover {
                        name
                        publicURL
                    }
                    date
                    authors
                }
            }
        }
      }
    }
  `);

  return (
    <ComponentListing edges={data.allMarkdownRemark.edges} />
  );
};

export default RecentComponents;
