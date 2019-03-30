const path = require('path')
const _ = require('lodash')
const fs = require('fs-extra')
const elasticlunr = require('elasticlunr')
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
    let fullIndex = {}
    return graphql(`
      {
        missions: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/missions\/.*\/index/" }}) {
          edges {
            node {
              id
              frontmatter {
                title
                filename
                authors
                description
                heroImage {
                  publicURL
                  childImageSharp {
                    fixed(width: 200) {
                      src
                    }
                  }
                }
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
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

        let authors = []

        const store = {}

        const index = elasticlunr(function () {
          this.setRef('id');
          this.addField('title');
          this.addField('description');
          this.addField('slug');
          this.addField('authors');
          this.addField('heroImage');
        });
        result.data.missions.edges.forEach(({node}) => {
          const id = node.id
          // console.log(node.frontmatter.heroImage)
          const doc = {
            id: id,
            title: node.frontmatter.title,
            slug: node.fields.slug,
            authors: node.frontmatter.authors,
            heroImage: (node.frontmatter.heroImage) ? node.frontmatter.heroImage.childImageSharp.fixed.src : null,
            description: node.frontmatter.description,
          }
          index.addDoc(doc)
          store[id] = doc
        })
        fullIndex = { index, store }
        fs.writeFileSync(`public/search_index.json`, JSON.stringify(fullIndex))

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