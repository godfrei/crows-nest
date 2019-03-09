const path = require('path');
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
        result.data.missions.edges.forEach(({node}) => {
            const escapedSlug = node.fields.slug.replace(/\//g, '\\$&');
            console.log(escapedSlug)
            const reviewRegex = `/${node.fields.slug}review.*/`
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/mission.js'),
                context: {
                    slug: node.fields.slug,
                    reviewRegex: reviewRegex
                },
            })
        })
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