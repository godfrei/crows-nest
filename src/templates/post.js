import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../layout";
import PostTags from "../components/PostTags";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import { pagination, postMeta } from "./post.module.scss";
import "./prism-okaidia.css";

const PostTemplate = ({ data, pageContext }) => {
  const { slug, nexttitle, nextslug, prevtitle, prevslug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  const date = postNode.fields.date;
  if (!post.id) {
    post.id = slug;
  }
  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <article>
        <h1>{post.title}</h1>
        <p className={postMeta}>{date}</p>
        <div className={postMeta}>
          <PostTags tags={post.tags} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
      </article>
      <nav>
        <ul className={pagination}>
          <li>
            <Link to={`/blog/${prevslug}`} rel="prev">
              ← {prevtitle}
            </Link>
          </li>
          <li>
            <Link to={`/blog/${nextslug}`} rel="next">
              {nexttitle}→
            </Link>
          </li>
        </ul>
      </nav>
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
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default PostTemplate;
