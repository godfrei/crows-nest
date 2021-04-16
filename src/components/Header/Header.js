import React from "react";
import { Link } from "gatsby";
import Navigation from "../Navigation";
import SiteTitle from "../SiteTitle";
import Search from "../Search";
import crow from "../../images/crow.png";
import { header, title } from "./Header.module.scss";

const Header = () => (
  <header className={header}>
    <div>
      <Link to="/" className={title}>
        <img src={crow} alt="The Moldy Crow" id="crow" />
        <SiteTitle />
      </Link>
      <Navigation />
      <Search />
    </div>
  </header>
);

export default Header;
