import React from 'react';
import { Link } from 'gatsby';
import { grid, navigation, content, active } from './enemies.module.scss';

const EnemiesLayout = ({children}) => {
    const linkProps = {
        activeClassName: active,
        partiallyActive: true
    }
    return (
        <>
            <div className={grid}>
                <ul className={navigation}>
                    <li><Link to="/database/enemies/imperial-officer" {...linkProps}><img src="/images/profiles/officer.png" alt="Imperial Officer" /></Link></li>
                    <li><Link to="/database/enemies/stormtrooper" {...linkProps}><img src="/images/profiles/stormtrooper.png" alt="Stormtrooper" /></Link></li>
                    <li><Link to="/database/enemies/imperial-commando" {...linkProps}><img src="/images/profiles/commando.png" alt="Imperial Commando" /></Link></li>
                    <li>
                        <Link to="/database/enemies/phase-i-dark-trooper" {...linkProps}>
                            <img src="/images/profiles/phase-1.png" alt="Phase I Dark Trooper" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/database/enemies/phase-ii-dark-trooper" {...linkProps}>
                            <img src="/images/profiles/phase-2.png" alt="Phase II Dark Trooper" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/database/enemies/phase-iii-dark-trooper" {...linkProps}>
                            <img src="/images/profiles/phase-3.png" alt="Phase III Dark Trooper" />
                        </Link>
                    </li>
                    <li>Gran</li>
                    <li>Trandoshan</li>
                    <li>Gamorrean Guard</li>
                    <li>Boba Fett</li>
                    <li>Interrogation Droid</li>
                    <li>Probe Droid</li>
                    <li>Remote</li>
                    <li>QS100 Welding Arm</li>
                    <li>Gun Turret</li>
                    <li>Power Generating Unit</li>
                    <li>MouseBot</li>
                    <li>Dianoga</li>
                    <li>Kell Dragon</li>
                </ul>
                <div className={content}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default EnemiesLayout;