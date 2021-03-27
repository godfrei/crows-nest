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
                        <li><Link to="/database/items/shield" {...linkProps}><img src="/images/items/shield.png" alt="Shield" /></Link></li>
                    </ul>

                    <h3>Ammunition</h3>
                    <ul className={navigation}>
                        <li>
                            <Link to="/database/items/energy-units" {...linkProps}><img src="/images/items/energy-units.png" alt="Energy Units" /></Link>
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