import React from 'react'
import MissionCard from '../MissionCard'
import { missionGrid } from './MissionListing.module.scss';

const MissionListing = ({ missionNodes }) => {
  return (
    <ul className={missionGrid}>
      {
      missionNodes.map(mission => {
        return (
          <li key={mission.slug}>
            <MissionCard node={mission} />
          </li>
        );
      })
      }
    </ul>
  )
}

export default MissionListing
