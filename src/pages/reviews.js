import React from "react"
import { Link, graphql } from "gatsby"
import BodyClassName from "react-body-classname"
import Layout from "../components/layout"
import reviewList from "../images/reviews.png"

export default ({ data }) => {
  console.log(data.allMarkdownRemark.edges)
  return (
    <BodyClassName className="reviews">
      <Layout>
        <div>
          <img src={reviewList} alt="" className="section_icon" />
          <h1 className="gradient-glow" data-text="Reviews">Reviews</h1>

          <p>The Review section is split into two different categories. The first is levels with a plot, that follow along the lines of the levels included in the original Dark Forces. Levels are organized alphabetically, and each level gets a detailed review and a percentage rating. The second category, Showcase Levels, deals with levels where the author has not made much effort to create a detailed environment accompanied by a story but really has put together a short segment to 'showcase' some loophole or feature of the Dark Forces engine, to test an idea that could be used in future levels, or just to have some fun. For each of those I explain what's going on in the level and give you a simple recommendation on whether it might be worth your time.</p>

          <p>Right now the Review Lists are incomplete, but I'm working hard to catch up. I'd estimate that about 60-odd percent of the levels available have been reviewed. If there's one you'd specifically like me to review just let me know. If you want to review one of the levels(one you did not create, in order to be fair) check the <Link to="/database">Database</Link> for more info on how to go about it and then just mail me the review.</p>

          <p>All the levels are available in <Link to="/storage">Storage</Link> for download. For easier access I've also included a download link at the end of each of the reviews.</p>

          <strong>{data.allMarkdownRemark.totalCount} Posts</strong>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
              <Link to={node.fields.slug }>
                  <h3>{node.frontmatter.mission.frontmatter.title}</h3>
                  <p>{node.frontmatter.mission.frontmatter.description}</p>
                  <p>{node.frontmatter.rating}</p>
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </BodyClassName>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/missions\/.*\/(?!info)/" }}
      sort: {
        fields: frontmatter___date
        order:DESC
      }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            rating
            mission {
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
                description
                author
              }
            }
          }
          fields {
              slug
          }
          excerpt
        }
      }
    }
  }
`