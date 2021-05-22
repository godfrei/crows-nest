import React from "react";
import { Link } from "gatsby";
import { grid, navigation, active, enemyNav, enemyContent } from "./enemies.module.scss";

const EnemiesLayout = ({ children }) => {
  const linkProps = {
    activeClassName: active,
    partiallyActive: true,
  };
  return (
    <>
      <div className={grid}>
        <div className={enemyContent}>{children}</div>
        <div className={enemyNav}>
          {/* <h1>ENEMIES</h1> */}
          <h2>Imperial</h2>
          <ul className={navigation}>
            <li>
              <Link to="/database/enemies/imperial-officer" {...linkProps}>
                <img
                  src="/images/profiles/officer.png"
                  alt="Imperial Officer"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/stormtrooper" {...linkProps}>
                <img
                  src="/images/profiles/stormtrooper.png"
                  alt="Stormtrooper"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/imperial-commando" {...linkProps}>
                <img
                  src="/images/profiles/commando.png"
                  alt="Imperial Commando"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/phase-i-dark-trooper" {...linkProps}>
                <img
                  src="/images/profiles/phase-1.png"
                  alt="Phase I Dark Trooper"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/phase-ii-dark-trooper" {...linkProps}>
                <img
                  src="/images/profiles/phase-2.png"
                  alt="Phase II Dark Trooper"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/database/enemies/phase-iii-dark-trooper"
                {...linkProps}
              >
                <img
                  src="/images/profiles/phase-3.png"
                  alt="Phase III Dark Trooper"
                />
              </Link>
            </li>
          </ul>

          <h2>Independent</h2>
          <ul className={navigation}>
            <li>
              <Link to="/database/enemies/gran" {...linkProps}>
                <img src="/images/profiles/reeyees.png" alt="Gran" />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/trandoshan" {...linkProps}>
                <img src="/images/profiles/bossk.png" alt="Trandoshan" />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/gamorrean-guard" {...linkProps}>
                <img
                  src="/images/profiles/gamorrean.png"
                  alt="Gamorrean Guard"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/boba-fett" {...linkProps}>
                <img src="/images/profiles/fett.png" alt="Boba Fett" />
              </Link>
            </li>
          </ul>

          <h2>Droids</h2>
          <ul className={navigation}>
            <li>
              <Link to="/database/enemies/interrogation-droid" {...linkProps}>
                <img
                  src="/images/profiles/int-droid.png"
                  alt="Interrogation Droid"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/probe-droid" {...linkProps}>
                <img src="/images/profiles/probe.png" alt="Probe Droid" />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/remote" {...linkProps}>
                <img src="/images/profiles/remote.png" alt="Remote" />
              </Link>
            </li>
          </ul>

          <h2>Creatures</h2>
          <ul className={navigation}>
            <li>
              <Link to="/database/enemies/dianoga" {...linkProps}>
                <img src="/images/profiles/dianoga.png" alt="Dianoga" />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/kell-dragon" {...linkProps}>
                <img src="/images/profiles/kell-dragon.png" alt="Kell Dragon" />
              </Link>
            </li>
          </ul>

          <h2>Environmental</h2>
          <ul className={navigation}>
            <li>
              <Link to="/database/enemies/qs-100-welding-arm" {...linkProps}>
                <img src="/images/profiles/welder.png" alt="QS100 Welding Arm" />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/gun-turret" {...linkProps}>
                <img src="/images/profiles/turret.png" alt="Gun Turret" />
              </Link>
            </li>
            <li>
              <Link
                to="/database/enemies/power-generating-unit-pgu"
                {...linkProps}
              >
                <img
                  src="/images/profiles/pgu.png"
                  alt="Power Generating Unit"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/enemies/mousebot" {...linkProps}>
                <img src="/images/profiles/mousebot.png" alt="Mousebot" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default EnemiesLayout;
