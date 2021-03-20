import React from 'react'
import MissionCard from '../MissionCard'
import { missionGrid } from './MissionListing.module.scss';

const MissionListing = ({ missionEdges }) => {
  return (
    <ul className={missionGrid}>
      {
      missionEdges.map(mission => {
        return (
          <li key={mission.node.fields.slug}>
            <MissionCard node={mission.node} />
          </li>
        );
      })
      }
    </ul>
  )
}

export default MissionListing
