import React from "react";
import { Link } from "gatsby";
import { grid, navigation, active } from "./weapons.module.scss";

const WeaponsLayout = ({ children }) => {
  const linkProps = {
    activeClassName: active,
    partiallyActive: true,
  };
  return (
    <>
      <div className={grid}>
        <div>
          <ul className={navigation}>
            <li>
              <Link to="/database/weapons/fists" {...linkProps}>
                <img src="/images/weapons/fists.png" alt="Fists" />
              </Link>
            </li>
            <li>
              <Link to="/database/weapons/modified-bryar-pistol" {...linkProps}>
                <img
                  src="/images/weapons/bryar.gif"
                  alt="Modified Bryar Pistol"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/weapons/stormtrooper-rifle" {...linkProps}>
                <img
                  src="/images/weapons/stormtrooper-rifle.png"
                  alt="Stormtrooper Rifle"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/weapons/thermal-detonators" {...linkProps}>
                <img
                  src="/images/weapons/thermal-detonator.png"
                  alt="Thermal Detonators"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/database/weapons/imperial-repeater-rifle"
                {...linkProps}
              >
                <img
                  src="/images/weapons/repeater.png"
                  alt="Imperial Repeater Rifle"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/weapons/jeron-fusion-cutter" {...linkProps}>
                <img
                  src="/images/weapons/fusion-cutter.png"
                  alt="Jeron Fusion Cutter"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/database/weapons/imperial-machines-i-m-mines"
                {...linkProps}
              >
                <img
                  src="/images/weapons/mine.png"
                  alt="Imperial Machine (I.M.) Mines"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/weapons/packered-mortar-gun" {...linkProps}>
                <img
                  src="/images/weapons/mortar-gun.png"
                  alt="Packered Mortar Gun"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/database/weapons/stouker-concussion-rifle"
                {...linkProps}
              >
                <img
                  src="/images/weapons/concussion-rifle.png"
                  alt="Stouker Concussion Rifle"
                />
              </Link>
            </li>
            <li>
              <Link to="/database/weapons/assault-cannon" {...linkProps}>
                <img
                  src="/images/weapons/assault-cannon.png"
                  alt="Assault Cannon"
                />
              </Link>
            </li>
          </ul>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default WeaponsLayout;
