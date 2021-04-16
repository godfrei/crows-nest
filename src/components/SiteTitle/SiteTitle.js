import React from "react";
import { siteTitle, apos } from "./SiteTitle.module.scss";

const SiteTitle = () => {
  return (
    <h1 className={siteTitle}>
      <span data-text="The"><span>The</span></span>
      <strong data-text="Crow’s Nest"><span>Crow’s Nest</span></strong>
    </h1>
  );
};

export default SiteTitle;
