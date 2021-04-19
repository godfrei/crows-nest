import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostTags from "../components/PostTags";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import {
  pagination,
  postMeta,
  coverClass,
  postContent,
} from "./post.module.scss";
import "./prism-okaidia.css";

const PostTemplate = ({ data, pageContext }) => {
  const { slug, nexttitle, nextslug, prevtitle, prevslug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const date = postNode.fields.date;
  const cover = post.cover ? post.cover.publicURL : "";
  if (!post.id) {
    post.id = slug;
  }
  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div class="text">
        <article>
          <img src={cover} className={coverClass} alt="" />
          <h1>{post.title}</h1>
          <p className={postMeta}>{date}</p>
          <div className={postMeta}>
            <PostTags tags={post.tags} />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: postNode.html }}
            className={postContent}
          />
        </article>
        <nav>
          <ul className={pagination}>
            <li>
              <Link to={`/${prevslug}`} rel="prev">
                ← {prevtitle}
              </Link>
            </li>
            <li>
              <Link to={`/${nextslug}`} rel="next">
                {nexttitle}→
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
        cover {
          publicURL
        }
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default PostTemplate;
