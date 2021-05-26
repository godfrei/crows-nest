import React from "react";
import * as styles from "./Tag.module.scss";

const Tag = ({
  text,
  type = "",
  className = "",
}) => {
  const typeClass = styles[type];
  return (
    <span className={`${styles.tag} ${typeClass} ${className}`}>{text}</span>
  );
};

export default Tag;
