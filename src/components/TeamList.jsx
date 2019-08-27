import React from 'react'

export default function TeamList({ teams, selectTeam }) {
  return (
    <div className="teams">
      <ul className="list">
        {teams.map(team => (
          <li className="list-item" key={team.id}>
            <div>
              <button className="selector-btn" onClick={() => selectTeam(team)}>
                {team.name}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
