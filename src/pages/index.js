import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import BodyClassName from "react-body-classname";
import SiteTitle from "../components/SiteTitle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import ReviewListing from "../components/ReviewListing";
import TopPost from "../components/TopPost";
import EditorsChoiceListing from "../components/EditorsChoiceListing";
import RecentComponents from "../components/RecentComponents";
import { home, grid, crow, planet } from "./index.module.scss";

const Index = ({ data }) => {
  const topPost = data.allMarkdownRemark.edges[0];
  const otherPosts = data.allMarkdownRemark.edges.slice(1);
  return (
    <BodyClassName className={home}>
      <>
        <Helmet
          htmlAttributes={{
            lang: "en",
          }}
        >
          <title>{config.siteTitle}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <SEO />
        <Header />
        <div className="cn-layout">
          <div className="glow"></div>
          <main>
            <div id="site-title">
              <SiteTitle title={config.siteTitle} />
              <p>
                The most complete and up-to-date site for reviews and downloads
                of add-on levels for the LucasArts 3D first-person game{" "}
                <em>Dark Forces</em>. At least, it used to be. Getting back to
                it.
              </p>
            </div>
            <StaticImage src="../../static/images/planet_hologram.png" alt="" className={planet} loading="eager" placeholder="blurred" width="660" />
            <StaticImage src="../../static/images/crow.png" alt="An image of Kyle Katarn's ship, the Moldy Crow, flying toward you." className={crow} loading="eager" placeholder="blurred" />
            
            <div className={grid}>
              <div>
                <h2 className="uppercase">Recent Posts</h2>
                <TopPost post={topPost} />
                <PostListing postEdges={otherPosts} />
              </div>
              <div>
                <h2 className="uppercase">Recent Reviews</h2>
                <ReviewListing />
              </div>
            </div>

            <section>
              <h2>Looking for a guaranteed mission to try?</h2>
              <p>
                The Editor's Choice missions have been selected by reviewers at
                The Crow's Nest as the best the Dark Forces community has to
                offer.
              </p>
              <Link to="/missions/editors-choice">
                All Editor's Choice Missions
              </Link>
              <EditorsChoiceListing />
            </section>

            <section>
              <h2>Everything You Need To Build The Next Great Mission</h2>
              <p>
                Editors, textures, sounds, enemies, and more are all available in <Link to="/storage">Storage</Link>. Here are a few of the latest additions.
              </p>
              <RecentComponents />
            </section>
          </main>
          <Footer />
        </div>
      </>
    </BodyClassName>
  );
};

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "posts" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          html
          frontmatter {
            title
            description
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 672
                  layout: CONSTRAINED
                )
              }
              publicURL
            }
            date
          }
        }
      }
    }
  }
`;
