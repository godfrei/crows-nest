import React from "react";
import { Link } from "gatsby";
import { title, grid, navigation, active } from "./database.module.scss";

const DatabaseLayout = ({ children }) => {
  const linkProps = {
    activeClassName: active,
    partiallyActive: true,
  };
  return (
    <>
      <h1 className={title}>Database</h1>
      <div className={grid}>
        <ul className={navigation}>
          <li>
            <Link to="/database" activeClassName={active}>
              General Info
            </Link>
          </li>
          <li>
            <Link to="/database/demo" {...linkProps}>
              Demo
            </Link>
          </li>
          <li>
            <Link to="/database/enemies" {...linkProps}>
              Enemies
            </Link>
          </li>
          <li>
            <Link to="/database/weapons" {...linkProps}>
              Weapons
            </Link>
          </li>
          <li>
            <Link to="/database/items" {...linkProps}>
              Items
            </Link>
          </li>
          <li>
            <Link to="/database/cheats" {...linkProps}>
              Cheat Codes
            </Link>
          </li>
          <li>
            <Link to="/database/launch-missions" {...linkProps}>
              Launch Missions
            </Link>
          </li>
          <li>
            <Link
              to="/database/specs"
              {...linkProps}
              title="Dark Forces Unofficial Specifications"
            >
              Tech Specs
            </Link>
          </li>
        </ul>
        <div>{children}</div>
      </div>
    </>
  );
};

export default DatabaseLayout;
