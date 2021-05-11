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

  return (
    <Link
      to={link}
      className={`${card} ${orientationClass} ${typeClass}`}
    >
      {coverURL && (
        <div className={cover} style={{ backgroundImage: `url(${coverURL})` }}></div>
      )}
      <article>
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
