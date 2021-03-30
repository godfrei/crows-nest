import React from 'react';
import { Link } from 'gatsby';
import { grid, navigation, content, active } from './items.module.scss';

const ItemsLayout = ({children}) => {
    const linkProps = {
        activeClassName: active,
        partiallyActive: true
    }
    return (
        <>
            <div className={grid}>
                <div>
                    <h3>Powerups</h3>
                    <ul className={navigation}>
                        <li><Link to="/database/items/shield-units" {...linkProps}><img src="/images/items/shield.png" alt="Shield Units" /></Link></li>
                        <li><Link to="/database/items/med-kit" {...linkProps}><img src="/images/items/medkit.png" alt="Med Kit" /></Link></li>
                        <li><Link to="/database/items/key" {...linkProps}><img src="/images/items/key-red.png" alt="Key" /></Link></li>
                        <li><Link to="/database/items/battery" {...linkProps}><img src="/images/items/battery.png" alt="Battery" /></Link></li>
                        <li><Link to="/database/items/air-mask" {...linkProps}><img src="/images/items/air-mask.png" alt="Air Mask" /></Link></li>
                        <li><Link to="/database/items/ice-cleats" {...linkProps}><img src="/images/items/ice-cleats.png" alt="Ice Cleats" /></Link></li>
                        <li><Link to="/database/items/infrared-goggles" {...linkProps}><img src="/images/items/goggles.png" alt="Infrared Goggles" /></Link></li>
                        <li><Link to="/database/items/revive" {...linkProps}><img src="/images/items/revive.png" alt="Revive" /></Link></li>
                        <li><Link to="/database/items/shield-supercharge" {...linkProps}><img src="/images/items/shield-supercharge.png" alt="Shield Supercharge" /></Link></li>
                        <li><Link to="/database/items/weapon-supercharge" {...linkProps}><img src="/images/items/weapon-supercharge.png" alt="Weapon Supercharge" /></Link></li>
                        <li><Link to="/database/items/extra-life" {...linkProps}><img src="/images/items/extra-life.png" alt="Extra Life" /></Link></li>
                    </ul>

                    <h3>Ammunition</h3>
                    <ul className={navigation}>
                        <li>
                            <Link to="/database/items/energy-units" {...linkProps}><img src="/images/items/energy-units.png" alt="Energy Units" /></Link>
                        </li>
                        <li>
                            <Link to="/database/items/power-cells" {...linkProps}><img src="/images/items/power-cells.png" alt="Power Cells" /></Link>
                        </li>
                        <li>
                            <Link to="/database/items/shells" {...linkProps}><img src="/images/items/shell.png" alt="Shell" /></Link>
                        </li>
                        <li>
                            <Link to="/database/items/plasma-cartridges" {...linkProps}><img src="/images/items/plasma-cartridge.png" alt="Plasma Cartridge" /></Link>
                        </li>
                        <li>
                            <Link to="/database/items/missiles" {...linkProps}><img src="/images/items/missile-pack.png" alt="Missiles" /></Link>
                        </li>
                    </ul>
                </div>
                <div className={content}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ItemsLayout;