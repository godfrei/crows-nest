import React from "react";
import { Link } from "gatsby";
import {
  componentList,
  componentCard,
  meta,
} from "./ComponentListing.module.scss";
import ComponentCard from "../ComponentCard";

const ComponentListing = ({ edges }) => {
  return (
    <ul className={componentList}>
      {edges.map((edge) => {
        return (
          <li>
            <ComponentCard node={edge.node} />
            {/* <Link to={`/${edge.node.fields.slug}`} key={edge.node.title} className={componentCard}>
              <article>
                <h1>{edge.node.frontmatter.title}</h1>
                <div className={meta}>{edge.node.fields.date}</div>
                <p>{edge.node.frontmatter.description}</p>
                <span className="fauxLink">Read More</span>
              </article>
            </Link> */}
          </li>
        );
      })}
    </ul>
  );
};

export default ComponentListing;
