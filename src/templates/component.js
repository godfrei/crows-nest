import React from "react"
import { graphql, Link, withPrefix } from "gatsby"
import _ from "lodash"
import Helmet from "react-helmet"
import config from "../../data/SiteConfig"
import Layout from "../components/layout"

export default ({ pageContext, data }) => {
  function getDownloadLink(data) {
    const post = data.markdownRemark
    const file = data.file
    // console.log(data)
    if(file) {
      return (
        <a href={ withPrefix(`/${post.frontmatter.component_type}s/${post.frontmatter.filename}`) } className="download">
          <strong>Download {post.frontmatter.filename}</strong>
          ({data.file.prettySize}) 
        </a>
      )
    }
    return null
  }

  const node = data.markdownRemark
  return (
    <Layout>
      <Helmet>
        <title>{`${node.frontmatter.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <h1>{ node.frontmatter.title }</h1>
      Author(s): { node.frontmatter.authors.map((author, index) => {
        return (
          <React.Fragment key={`${node.frontmatter.title}-${author}`}>
            { (index >=1) ? `, ` : `` }
            <Link to={`/authors/${_.kebabCase(author)}`}>{author}</Link>
          </React.Fragment>
        )
      })}
      <p>{node.frontmatter.description}</p>
      {getDownloadLink(data)}
      <hr />
      <div dangerouslySetInnerHTML={{ __html: node.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $filename: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        authors
        date(formatString: "MMMM Do, YYYY")
        filename
        component_type
        description
        heroImage {
            publicURL
        }
      }
    }
    file(relativePath: { eq: $filename }) {
      absolutePath
      prettySize
    }
  }
`