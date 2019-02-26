module.exports = {
    siteMetadata: {
      title: `The Crow's Nest`,
    },
    pathPrefix: `/missions`,
    plugins: [
        'gatsby-plugin-sass',
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
              name: `missions`,
              path: `${__dirname}/static/missions/`,
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
        }

    ]
}