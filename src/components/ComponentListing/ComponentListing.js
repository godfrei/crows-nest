import React from "react";
import { componentList } from "./ComponentListing.module.scss";
import ComponentCard from "../ComponentCard";

const ComponentListing = ({ edges }) => {
  return (
    <ul className={componentList}>
      {edges.map((edge) => {
        return (
          <li key={edge.node.fields.slug}>
            <ComponentCard node={edge.node} />
          </li>
        );
      })}
    </ul>
  );
};

export default ComponentListing;
