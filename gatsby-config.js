const config = require("./data/SiteConfig");

module.exports = {
    siteMetadata: {
      title: config.siteTitle,
    },
    pathPrefix: `/missions`,
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: config.siteTitle,
                short_name: config.siteTitleShort,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                icon: config.siteLogo,
                include_favicon: true,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `src`,
              path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `mission-files`,
              path: `${__dirname}/static/missions/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `content`,
              path: `${__dirname}/content/`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 970,
                            linkImagesToOriginal: false,
                            showCaptions: true
                        },
                    },
                ],
            },
        },
        {
            resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
            options: {
              // Fields to index
              fields: [`title`, `authors`, `content`, `slug`, `heroImage`],
              // How to resolve each field`s value for a supported node type
              resolvers: {
                // For any node of type MarkdownRemark, list how to resolve the fields` values
                MarkdownRemark: {
                  title: node => node.frontmatter.title,
                  authors: node => node.frontmatter.authors,
                  content: node => node.rawMarkdownBody,
                  slug: node => node.fields.slug,
                  heroImage: node => node.frontmatter.heroImage
                },
              },
            },
          },
    ],
    mapping: {
        'MarkdownRemark.frontmatter.mission': 'MarkdownRemark.frontmatter.mission_id',
        'MarkdownRemark.frontmatter.mission_id': 'MarkdownRemark.frontmatter.mission',
    }
}