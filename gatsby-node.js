const path = require('path')
const _ = require('lodash')
const fs = require('fs-extra')
const elasticlunr = require('elasticlunr')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if(node.internal.type === 'MarkdownRemark') {
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
        three_dos: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/3dos\/.*\/index/" }}) {
          edges {
            node {
              id
              fields {
                slug
              }
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
            }
          }
        }
        missions: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/missions\/.*\/index/" }}) {
          edges {
            node {
              id
              frontmatter {
                title
                filename
                authors
                description
                editorsChoice
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
        specs: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/specs/" }}) {
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

    // Build search Index
    let authors = []
    const store = {}
    const index = elasticlunr(function () {
      this.setRef('id')
      this.addField('title')
      this.addField('description')
      this.addField('slug')
      this.addField('authors')
      this.addField('heroImage')
      this.addField('editorsChoice')
    })

    result.data.three_dos.edges.forEach(({node}) => {
      const escapedSlug = node.fields.slug.replace(/\//g, '\\$&');
      authors = authors.concat(node.frontmatter.authors)
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/component.js'),
        context: {
          slug: node.fields.slug,
          filename: node.frontmatter.filename
        },
      })
    })

    result.data.missions.edges.forEach(({node}) => {
      // Create mission pages and fill authors array
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

      // Build Search Index for missions
      const id = node.id
      const doc = {
        id: id,
        title: node.frontmatter.title,
        slug: node.fields.slug,
        authors: node.frontmatter.authors,
        heroImage: (node.frontmatter.heroImage) ? node.frontmatter.heroImage.childImageSharp.fixed.src : null,
        description: node.frontmatter.description,
        editorsChoice: node.frontmatter.editorsChoice,
        type: "mission"
      }
      index.addDoc(doc)
      store[id] = doc
    })

    // Eliminate duplicate authors
    authors = _.uniq(authors)

    authors.forEach(author => {
      const id = _.kebabCase(author)
      const slug = `/authors/${id}/`
      // Make author pages
      createPage({
        path: slug,
        component: path.resolve('./src/templates/author.js'),
        context: {
          author,
        },
      })

      // Add authors to search index
      const doc = {
        id: id,
        title: author,
        slug: slug,
        type: "author"
      }
      index.addDoc(doc)
      store[id] = doc
    })

    fullIndex = { index, store }
    // Write the index file when building for loading into the site (see gatsby-browser)
    fs.writeFileSync(`public/search_index.json`, JSON.stringify(fullIndex))

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

    // Create spec pages
    result.data.specs.edges.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/spec.js'),
        context: {
          slug: node.fields.slug
        },
      })
    })
  })
}