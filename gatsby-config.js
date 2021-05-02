const urljoin = require("url-join");
const config = require("./data/SiteConfig");
const _ = require("lodash");

function getGuidSuffix(edge) {
  const authors = edge.node.frontmatter.authors.join("-");
  return edge.node.fields.slug + _.kebabCase(authors);
}

function getCoverImage(edge) {
  const cover =
    edge.node.frontmatter.cover ||
    (edge.node.frontmatter.mission && edge.node.frontmatter.mission.cover);
  if (!cover || typeof cover === "undefined") return "";
  return `<img src="${config.siteUrl}${cover.publicURL}" alt="" />`;
}

module.exports = {
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}logos/logo-48.png`,
      copyright: config.copyright,
    },
  },
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/missions.json`,
        name: `missions`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/screenshots.json`,
        name: `screenshots`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data/missions`,
        name: `missionFiles`,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    "gatsby-plugin-htaccess",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "reviews",
        path: `${__dirname}/content/missions`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "3dos",
        path: `${__dirname}/content/3dos`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "specs",
        path: `${__dirname}/content/specs`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "waxes",
        path: `${__dirname}/content/waxes`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "vocs",
        path: `${__dirname}/content/vocs`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "bms",
        path: `${__dirname}/content/bms`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fmes",
        path: `${__dirname}/content/fmes`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "enemies",
        path: `${__dirname}/content/enemies`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "items",
        path: `${__dirname}/content/items`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "weapons",
        path: `${__dirname}/content/weapons`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers",
        ],
      },
    },
    // {
    //   resolve: "gatsby-plugin-google-analytics",
    //   options: {
    //     trackingId: config.googleAnalyticsID
    //   }
    // },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: `static/logos/logo-1024.png`,
        // icons: [
        //   // {
        //   //   src: '/logos/logo-48.png',
        //   //   sizes: '48x48',
        //   //   type: 'image/png',
        //   // },
        //   {
        //     src: '/logos/logo-1024.png',
        //     sizes: '1024x1024',
        //     type: 'image/png',
        //   },
        // ],
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'pages',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',
        // engineOptions: {
        //   profile: 'match',
        //   encode: "icase",
        // },

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allMarkdownRemark(
              filter: {fields: {collection: {nin: ["reviews"]}}}
            ) {
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                }
                html
              }
            }
            allMissionsJson {
              nodes {
                id
                slug
                description
                title
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'body'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'slug', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) => {
          const indexArray = [];
          data.allMarkdownRemark.nodes.map((node) => {
            indexArray.push({
              id: node.id,
              slug: node.fields.slug,
              title: node.frontmatter.title,
              body: node.html,
            });
          });
          data.allMissionsJson.nodes.map((node) => {
            indexArray.push({
              id: node.id,
              slug: node.slug,
              title: node.title,
              body: node.description,
            });
          });
          return indexArray;
        }
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS Advanced Starter";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allMarkdownRemark.edges.map((edge) => ({
                // categories: edge.node.frontmatter.tags,
                date: edge.node.fields.date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + getGuidSuffix(edge),
                custom_elements: [
                  { "content:encoded": getCoverImage(edge) + edge.node.html },
                  { author: edge.node.frontmatter.authors.join(", ") },
                ],
              }));
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: {order: DESC, fields: frontmatter___date}
                filter: {fields: {collection: {in: ["reviews", "posts"]}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      cover {
                        publicURL
                        internal {
                          mediaType
                        }
                      }
                      date
                      authors
                      mission {
                        title
                        description
                        authors
                        cover {
                          publicURL
                          internal {
                            mediaType
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss,
            title: config.siteRss,
          },
        ],
      },
    },
  ],
};
