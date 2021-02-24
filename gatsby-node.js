const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

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
      slug = `/${collection}/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
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

  // Query all the markdown files

  // NEED TO FLESH OUT THE FRONTMATTER COLLECTED HERE TO INCLUDE MISSION/FILE INFO
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
  const missionAuthorSet = new Set();


  // Get all Markdown edges from the query
  const markdownEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  markdownEdges.sort((postA, postB) => {
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


  // POSTS

  let postEdges = markdownEdges.filter((edge) => {
    if (edge.node.fields.collection === 'posts') return edge;
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

    const nextID = index + 1 < markdownEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : markdownEdges.length - 1;
    const nextEdge = markdownEdges[nextID];
    const prevEdge = markdownEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
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


  // MISSIONS

  let missionEdges = markdownEdges.filter((edge) => {
    // Filter out only the missions, not the reviews
    if (edge.node.fields.collection === 'missions' && edge.node.fields.slug.indexOf('review') === -1) 
      return edge;
  });

  missionEdges.forEach((edge, index) => {
    if (edge.node.frontmatter.authors) {
      edge.node.frontmatter.authors.forEach(author => {
        missionAuthorSet.add(author);
      });
    }

    createPage({
      path: edge.node.fields.slug,
      component: missionPage,
      context: {
        slug: edge.node.fields.slug,
        reviewRegex: `/${edge.node.fields.slug}-review.*/`
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
      path: edge.node.fields.slug,
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
      path: edge.node.fields.slug,
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
      path: edge.node.fields.slug,
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
      path: edge.node.fields.slug,
      component: specPage,
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
