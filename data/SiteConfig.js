const config = {
  siteTitle: "The Crow's Nest", // Site title.
  siteTitleShort: "Crow's Nest", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "The Crow's Nest", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://darkforces.reviews", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "Reviews for community-made add-on levels for the LucasArts game *Dark Forces*.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  // siteFBAppID: '1825356251115265', // FB Application ID for using app insights
  // googleAnalyticsID: 'UA-161211056-1', // GA tracking ID.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Geoff Elliott", // Username to display in the author segment.
  userEmail: "geoff@darkforces.reviews", // Email used for RSS feed's author segment
  userTwitter: "godfrei", // Optionally renders "Follow Me" in the Bio segment.
  userGitHub: "godfrei", // Optionally renders "Follow Me" in the Bio segment.
  userLocation: "Earth", // User location to display in the author segment.
  userAvatar: "", // User avatar to display in the author segment.
  userDescription:
    "Star Wars is the first movie I remember seeing, and the Dark Forces community was a wonderful place to meet kindred spirits from around the world. Just hoping that a few people still remember.", // User description to display in the author segment.
  copyright: "Copyright © 1996. All rights reserved.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#1FE071", // Used for setting manifest and progress theme colors.
  backgroundColor: "black", // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
// if (config.siteRss && config.siteRss[0] !== "/")
//   config.siteRss = `/${config.siteRss}`;

module.exports = config;
