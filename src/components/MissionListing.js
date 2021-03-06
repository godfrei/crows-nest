import React from 'react'
import MissionCard from '../components/MissionCard'

const MissionListing = ({ missionEdges }) => {
  const getMissionList = () => {
    const missionList = []
    missionEdges.forEach(edge => {
      missionList.push(edge.node)
    })
    return missionList
  }

  const missionList = getMissionList()
  return (
    <ul className="mission-grid">
      {
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
