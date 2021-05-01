import React from "react";
import { Link } from "gatsby";
import SiteTitle from "../SiteTitle";
import config from "../../../data/SiteConfig";
import { footer, title, links, logo, map } from "./footer.module.scss";

export default () => {
  return (
    <footer className={footer}>
      <Link to="/" className={title}>
        <SiteTitle />
      </Link>
      <div className={links}>
        
        <ul className={map}>
          <li><strong>Home</strong>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li><Link to="/launchpad/">Launch Pad</Link></li>
              <li>
                <a href={config.siteRss} target="_blank" rel="noopener noreferrer">
                  RSS
                </a>
              </li>
            </ul>
          </li>
          <li><strong>Missions</strong>
            <ul>
              <li><Link to="/missions/editors-choice/">Editors' Choice</Link></li>
              <li><Link to="/missions/">Alphabetical</Link></li>
              <li><Link to="/missions/rating/">Rating</Link></li>
              <li><Link to="/missions/date/">Date</Link></li>
            </ul>
          </li>
          <li><strong>Database</strong>
            <ul>
              <li><Link to="/database/history/">Dark Forces History</Link></li>
              <li><Link to="/database/characters/">Characters</Link></li>
              <li><Link to="/database/enemies/">Enemies</Link></li>
              <li><Link to="/database/weapons/">Weapons</Link></li>
              <li><Link to="/database/items/">Items</Link></li>
              <li><Link to="/database/demo/">Demo</Link></li>
              <li><Link to="/database/get-dark-forces">Get Dark Forces</Link></li>
              <li><Link to="/database/launch-missions/">Launch Custom Missions</Link></li>
              <li><Link to="/database/cheats/">Cheat Codes</Link></li>
              <li><Link to="/database/tools/">Tools</Link></li>
              <li><Link to="/database/specs/">Tech Specs</Link></li>
            </ul>
          </li>
          <li><strong>Storage</strong>
            <ul>
              <li><Link to="/storage/3dos/">3DOs</Link></li>
              <li><Link to="/storage/bms/">BMs</Link></li>
              <li><Link to="/storage/fmes/">FMEs</Link></li>
              <li><Link to="/storage/patches/">Patches</Link></li>
              <li><Link to="/storage/vocs/">VOCs</Link></li>
              <li><Link to="/storage/waxes/">WAXes</Link></li>
            </ul>
          </li>
        </ul>

        <p>
          <small>
            {/* <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >
              <img
                alt="Creative Commons License"
                src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
              />
            </a> */}
            <span property="dct:title">{config.siteTitle}</span> by{" "}
            <span property="cc:attributionName">{config.userName}</span> is
            licensed under a{" "}
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0
              International License
            </a>
            .
            <br />
            Missions and other files belong to their respective authors.
            Star Wars, Dark Forces and all associated images belong to LucasFilm.
          </small>
        </p>

        <p><small>{config.copyright}</small></p>
      </div>
      <img src="/logo.svg" className={logo} alt="" />



    </footer>
  );
};
