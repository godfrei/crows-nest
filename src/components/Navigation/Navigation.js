import React from "react";
import { Link } from "gatsby";
import { active, navigation } from "./navigation.module.scss";

export default () => {
  const linkProps = {
    activeClassName: active,
    partiallyActive: true,
  };
  return (
    <nav className={navigation}>
      <ul>
        <li>
          <Link to="/blog/" {...linkProps}>
            Blog
          </Link>
        </li>
        <li>
          <Link to="/missions/" {...linkProps}>
            Missions
          </Link>
        </li>
        <li>
          <Link to="/database/" {...linkProps}>
            Database
          </Link>
        </li>
        <li>
          <Link to="/storage/" {...linkProps}>
            Storage
          </Link>
        </li>
      </ul>
    </nav>
  );
};
