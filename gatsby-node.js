const path = require('path')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if(node.internal.type === 'MarkdownRemark') {
        // console.log(createFilePath({ node, getNode, basePath: `pages` }))
        const slug = createFilePath({ node, getNode, basePath: 'pages' })
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const { createPage } = actions
    return graphql(`
      {
        missions: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/missions\/.*\/index/" }}) {
          edges {
            node {
              frontmatter {
                filename
                authors
              }
              fields {
                slug
              }
            }
          }
        }
        posts: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/posts/" }}) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
        let authors = []

        // Create mission pages and fill authors array
        result.data.missions.edges.forEach(({node}) => {
            const escapedSlug = node.fields.slug.replace(/\//g, '\\$&');
            const reviewRegex = `/${node.fields.slug}review.*/`
            authors = authors.concat(node.frontmatter.authors)
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/mission.js'),
                context: {
                    slug: node.fields.slug,
                    reviewRegex: reviewRegex,
                    filename: node.frontmatter.filename
                },
            })
        })

        // Eliminate duplicate authors
        authors = _.uniq(authors)

        // Make author pages
        authors.forEach(author => {
          createPage({
            path: `/authors/${_.kebabCase(author)}/`,
            component: path.resolve('./src/templates/author.js'),
            context: {
              author,
            },
          })
        })

        // Create blog post pages
        result.data.posts.edges.forEach(({node}) => {
          createPage({
              path: node.fields.slug,
              component: path.resolve('./src/templates/post.js'),
              context: {
                  slug: node.fields.slug
              },
          })
      })
    })
  }