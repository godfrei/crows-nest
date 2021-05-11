import React from "react";
import * as styles from "./Tag.module.scss";

const Tag = ({
  text,
  type = "",
}) => {
  const typeClass = styles[type];
  return (
    <span className={`${styles.tag} ${typeClass}`}>{text}</span>
  );
};

export default Tag;
