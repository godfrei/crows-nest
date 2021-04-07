import React from "react";
import { gradientTitle } from "./gradienttitle.module.scss";

export default ({ title }) => {
  return (
    <h1 className={gradientTitle} data-text={title}>
      <span>{title}</span>
    </h1>
  );
};
