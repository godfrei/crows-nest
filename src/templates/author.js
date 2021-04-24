import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import MissionListing from "../components/MissionListing";
import ComponentListing from "../components/ComponentListing";
import config from "../../data/SiteConfig";

const AuthorTemplate = ({ data, pageContext }) => {
  // console.log(data);

  const componentEdges = data.allMarkdownRemark.edges.filter(edge => {
    console.log(edge);
    return (edge.node.fields.collection !== "reviews" && edge.node.fields.collection !== "posts");
  });

  const postEdges = data.allMarkdownRemark.edges.filter(edge => {
    console.log(edge);
    return (edge.node.fields.collection === "reviews" || edge.node.fields.collection === "posts");
  });

  return (
    <Layout>
      <Helmet title={` "${pageContext.author}" - ${config.siteTitle}`} />
      <h1>{`Author: ${pageContext.author}`}</h1>

      {data.allMissionsJson.nodes.length > 0 &&
        <>
          <h2>Missions</h2>
          <MissionListing missionNodes={data.allMissionsJson.nodes} />
        </>
      }

      {componentEdges.length > 0 &&
        <>
          <h2>Components</h2>
          <ComponentListing edges={componentEdges} />
        </>
      }

      {postEdges.length > 0 &&
        <>
          <h2>Posts</h2>
          <ComponentListing edges={postEdges} />
        </>
      }

    </Layout>
  );
};

export default AuthorTemplate;

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    allMissionsJson(
      limit: 1000
      sort: { fields: [date], order: DESC }
      filter: { authors: { in: [$author] } }
    ) {
      nodes {
        slug
        title
        description
        date
        editorsChoice
        cover {
          publicURL
        }
        authors
        reviews {
          frontmatter {
            rating
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { authors: { in: [$author] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            collection
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
`;
