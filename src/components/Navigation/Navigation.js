import React from "react";
import { Link } from "gatsby";
import { active, navigation } from "./navigation.module.scss";
import launchPad from "../../images/launch_pad.png";
import reviewList from "../../images/reviews.png";
import storage from "../../images/storage.png";
import database from "../../images/database.png";

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
