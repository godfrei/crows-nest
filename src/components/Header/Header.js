import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Navigation from "../Navigation";
import SiteTitle from "../SiteTitle";
import Search from "../Search";
import { header, title } from "./Header.module.scss";

const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <header className={header}>
        <div>
          <Link to="/" className={title}>
            <img src="/images/crow.png" alt="The Moldy Crow" />
            <SiteTitle />
          </Link>
          <Navigation />
          <Search searchIndex={data.siteSearchIndex.index} />
        </div>
      </header>
    )}
  />
);

export default Header;
