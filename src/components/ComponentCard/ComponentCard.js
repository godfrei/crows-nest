import React from "react";
import Card from "../Card";
import Tag from "../Tag";
import {
  authorList,
  componentCover,
} from "./ComponentCard.module.scss";

const getTypeString = (type, link) => {
  if (type === "default" && link.indexOf("blog") !== -1) {
    return "blog";
  }
  else if(type === "default" && link.indexOf("blog") === -1) {
    return "review";
  }
  else if (type === "component") {
    if(link.indexOf("3do") !== -1) {
      return "3do";
    }
    else if (link.indexOf("bm") !== -1) {
      return "bm";
    }
    else if (link.indexOf("fme") !== -1) {
      return "fme";
    }
    else if (link.indexOf("voc") !== -1) {
      return "voc";
    }
    else if (link.indexOf("patch") !== -1) {
      return "patch";
    }
    else if (link.indexOf("wax") !== -1) {
      return "wax";
    }
  }
  return "mission";
}

const ComponentCard = ({ node, orientation }) => {
  const coverUrl = node.frontmatter.cover ? node.frontmatter.cover.publicURL : "";
  const authors = node.frontmatter.authors ? node.frontmatter.authors.join(", ") : "Unknown";
  const typeString = getTypeString("component", node.fields.slug);

  return (
    <Card link={`/${node.fields.slug}`} title={node.frontmatter.title} orientation={orientation} type="component">
      <div className="secondary">
        <Tag type="component" text={typeString} />
        <span title="Authors" className={authorList}>
          {authors}
        </span>
      </div>
      <p>{node.frontmatter.description}</p>
      {coverUrl && (
        <div className={componentCover} style={{ backgroundImage: `url(${coverUrl})` }} />
      )}
    </Card>
  );
};

export default ComponentCard;
