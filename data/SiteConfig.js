const config = {
  siteTitle: "The Crow's Nest", // Site title.
  siteTitleShort: "Crow's Nest", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "The Crow's Nest - Dark Forces Add-On Missions", // Alternative site title for SEO.
  siteLogo: "src/images/favicon.png", // Logo used for SEO and manifest.
  siteUrl: "", // Domain of your website without pathPrefix.
  pathPrefix: "/missions", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Reviews and downloads of add-on missions for the classic Star Wars game Dark Forces.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  copyright: "Copyright © 2019. Geoff Elliott", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#1FE071", // Used for setting manifest and progress theme colors.
  backgroundColor: "#000000" // Used for setting manifest background color.
};

module.exports = config;