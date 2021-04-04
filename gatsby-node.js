const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MissionsJson implements Node {
      id:             String
      slug:           String
      title:          String
      date:           Date
      editorsChoice:  Boolean
      authors:        [String]
      description:    String
      levelReplaced:  String
      difficulty:     Boolean
      bm:             Boolean
      fme:            Boolean
      wax:            Boolean
      three_do:       Boolean
      voc:            Boolean
      gmd:            Boolean
      vue:            Boolean
      lfd:            Boolean
      base:           String
      editors:        String
      reviews:        [MarkdownRemark] @link(by: "frontmatter.mission.slug", from: "slug")
      screenshots:    [ScreenshotsJson] @link(by: "mission.slug", from: "slug")
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      mission: MissionsJson @link(by: "slug")
    }
    
    type ScreenshotsJson implements Node {
      mission: MissionsJson @link(by: "slug")
      caption: String
    }
  `;
  createTypes(typeDefs);
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    const collection = _.get(fileNode, "sourceInstanceName");

    createNodeField({ node, name: "collection", value: collection});
    
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString()
        });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.js");
  // const tagPage = path.resolve("src/templates/tag.js");
  // const categoryPage = path.resolve("src/templates/category.js");
  const missionPage = path.resolve("src/templates/mission.js");
  const componentPage = path.resolve("src/templates/component.js");
  const specPage = path.resolve("src/templates/spec.js");
  const authorPage = path.resolve("src/templates/author.js");
  const enemyPage = path.resolve('src/templates/enemies/index.js');
  const itemPage = path.resolve('src/templates/items/index.js');
  const weaponPage = path.resolve('src/templates/weapons/index.js');

  // Create Mission Lists page
  createPage({
    path: '/missions',
    component: path.resolve('./src/templates/mission-list.js'),
    context: {
      'sort': 'title',
    },
  });

  // How to do this? Need to get rating from reviews, but...
  createPage({
    path: '/missions/rating',
    component: path.resolve('./src/templates/mission-list.js'),
    context: {
      'sort': 'rating',
    },
  });

  createPage({
    path: '/missions/date',
    component: path.resolve('./src/templates/mission-list.js'),
    context: {
      'sort': 'date',
    },
  });

  // Query Missions JSON

  const missionQueryResult = await graphql(
    `
      {
        allMissionsJson {
          nodes {
            slug
            cover {
							publicURL
            }
          }
        }
      }
    `
  );

  if (missionQueryResult.errors) {
    console.error(missionQueryResult.errors);
    throw missionQueryResult.errors;
  }

  const missionNodes = missionQueryResult.data.allMissionsJson.nodes;

  // MISSIONS

  // let missionEdges = markdownEdges.filter((edge) => {
  //   // Filter out only the missions, not the reviews
  //   if (edge.node.fields.collection === 'missions' && edge.node.fields.slug.indexOf('review') === -1) 
  //     return edge;
  // });

  missionNodes.forEach((node, index) => {
    createPage({
      path: `/missions/${node.slug}`,
      component: missionPage,
      context: {
        slug: node.slug,
      }
    });
  });

  // Query all the markdown files

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                collection
              }
              frontmatter {
                title
                date
                authors
                filename {
                  publicURL
                }
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  // const tagSet = new Set();
  // const categorySet = new Set();
  


  // Get all Markdown edges from the query
  const markdownEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  // POSTS

  let postEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'posts') return edge;
  });

  postEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat
    );

    if (dateA.isBefore(dateB)) return -1;
    if (dateB.isBefore(dateA)) return 1;

    return 0;
  });

  postEdges.forEach((edge, index) => {
    // if (edge.node.frontmatter.tags) {
    //   edge.node.frontmatter.tags.forEach(tag => {
    //     tagSet.add(tag);
    //   });
    // }

    // if (edge.node.frontmatter.categories) {
    //   edge.node.frontmatter.categories.forEach(category => {
    //     categorySet.add(category)
    //   })
    // }

    const nextID = index + 1 < postEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postEdges.length - 1;
    const nextEdge = postEdges[nextID];
    const prevEdge = postEdges[prevID];

    createPage({
      path: `/blog/${edge.node.fields.slug}`,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      }
    });
  });

  // 3DOs

  let threeDOEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === '3dos') 
      return edge;
  });

  threeDOEdges.forEach((edge, index) => {
    createPage({
      path: `/3dos/${edge.node.fields.slug}`,
      component: componentPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });

  // VOCs

  let vocEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'vocs') 
      return edge;
  });

  vocEdges.forEach((edge, index) => {
    createPage({
      path: `/vocs/${edge.node.fields.slug}`,
      component: componentPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });

  // WAXes

  let waxEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'waxes') 
      return edge;
  });

  waxEdges.forEach((edge, index) => {
    createPage({
      path: `/waxes/${edge.node.fields.slug}`,
      component: componentPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });

  // Specs

  let specEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'specs') 
      return edge;
  });

  specEdges.forEach((edge, index) => {
    createPage({
      path: `/database/specs/${edge.node.fields.slug}`,
      component: specPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });

  // Authors

  const authorSet = new Set();

  markdownEdges.forEach((edge) => {
    if (edge.node.frontmatter.authors) {
      edge.node.frontmatter.authors.forEach(author => {
        authorSet.add(author);
      });
    }
  });

  authorSet.forEach(author => {
    createPage({
      path: `/authors/${_.kebabCase(author)}`,
      component: authorPage,
      context: {
        author
      }
    });
  });

  // Enemies

  let enemyEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'enemies') 
      return edge;
  });

  enemyEdges.forEach((edge, index) => {
    createPage({
      path: `/database/enemies/${edge.node.fields.slug}`,
      component: enemyPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });

  // Items

  let itemEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'items') 
      return edge;
  });

  itemEdges.forEach((edge, index) => {
    createPage({
      path: `/database/items/${edge.node.fields.slug}`,
      component: itemPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });

  // Weapons

  let weaponEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'weapons') 
      return edge;
  });

  weaponEdges.forEach((edge, index) => {
    createPage({
      path: `/database/weapons/${edge.node.fields.slug}`,
      component: weaponPage,
      context: {
        slug: edge.node.fields.slug,
      }
    });
  });


 // Generate link foreach tag page
  // tagSet.forEach(tag => {
  //   createPage({
  //     path: `/tags/${_.kebabCase(tag)}/`,
  //     component: tagPage,
  //     context: {
  //       tag
  //     }
  //   });
  // });

  // // Generate link foreach category page
  // categorySet.forEach(category => {
  //   createPage({
  //     path: `/${_.kebabCase(category)}/`,
  //     component: categoryPage,
  //     context: {
  //       category
  //     }
  //   });
  // });
};
