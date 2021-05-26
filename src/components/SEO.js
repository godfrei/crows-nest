import React from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../data/SiteConfig";

const SEO = ({ postNode, postPath, postSEO }) => {
  let title = config.siteTitle;
  let description = config.siteDescription;
  let image;
  let imageDesc = "The Crow's Nest logo.";
  let postURL;

  if (postSEO) {
    const postMeta = postNode.frontmatter;
    ({ title } = postMeta);
    description = postMeta.description
      ? postMeta.description
      : postNode.excerpt;
    image = postMeta?.cover?.publicURL;
    imageDesc = postNode?.coverAlt || postNode.frontmatter?.coverAlt || "The Crow's Nest logo.";
    if (typeof postPath !== 'string') postPath = config.pathPrefix;
    postURL = urljoin(config.siteUrl, postPath);
  }

  if (typeof image !== 'string') image = config.siteLogo;
  image = urljoin(config.siteUrl, image);
  const siteURL = urljoin(config.siteUrl, config.pathPrefix);
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: siteURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
    },
  ];
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postURL,
              name: title,
              image,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: siteURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image,
        },
        description,
      }
    );
  }
  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : siteURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageDesc} />
      {/* <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ""}
      /> */}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content={config.userTwitter ? config.userTwitter : ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageDesc} />
    </Helmet>
  );
};

export default SEO;
