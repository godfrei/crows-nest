import React from 'react'
import { Link } from 'gatsby'
import MissionCard from '../components/MissionCard'
import styles from './PostsListing.module.scss'

const MissionListing = ({ missionEdges }) => {
  const getMissionList = () => {
    const missionList = []
    missionEdges.forEach(postEdge => {
      missionList.push(postEdge.node)
    })
    return missionList
  }

  const missionList = getMissionList()
  return (
    <ul className="mission-grid">
      {/* Your post list here. */
      missionList.map(mission => {
        return (
          <li key={mission.fields.slug}>
            <MissionCard node={mission} />
          </li>
        );
      })
      }
    </ul>
  )
}

export default MissionListing
