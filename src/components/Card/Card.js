import React from "react";
import { Link } from "gatsby";
import Aurebesh from "../Aurebesh";
import {
  card,
  cover,
  horizontal,
  vertical,
  mission,
  component,
  tag,
} from "./Card.module.scss";

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

const Card = ({
  title,
  coverURL,
  orientation,
  children,
  link,
  type = "default"
}) => {
  const orientationClass = orientation === "vertical" ? vertical : horizontal;
  let typeClass = '';
  if (type === "mission") typeClass = mission;
  else if (type === "component") typeClass = component;

  const tagText = getTypeString(type, link);

  return (
    <Link
      to={link}
      className={`${card} ${orientationClass} ${typeClass}`}
    >
      {coverURL && (
        <div className={cover} style={{ backgroundImage: `url(${coverURL})` }}></div>
      )}
      <article>
        <span className={tag}>{tagText}</span>
        <h1>
          <Aurebesh text={title} />
          {title}
        </h1>
        {children}
      </article>
    </Link>
  );
};

export default Card;
