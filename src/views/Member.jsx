// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from '../history.js'
// import config from '../config.json'
import './Member.scss'

export default function Member({ props }) {
  // MARK: State
  let [user, setUser] = useState(null)
  let [teamNames, setTeamNames] = useState([])

  // MARK: Effects
  // MARK: - Load user info from Tempo backend on initialization
  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get(props.url)
        if (result.data) {
          setUser(result.data)

          result.data.member_teams.map(teamId => {
            let arr = props.teams.filter(el => el.id === teamId)
            setTeamNames(t => [...t, arr[0].name])

            return null
          })
        }
      } catch (err) {
        history.push('/')
      }
    }

    fetchData()
  }, [props])

  // MARK: Helpers
  let navBack = () => {
    history.push('/team')
  }

  // MARK: Return
  return (
    <div className="member">
      {user === null ? (
        <div data-testid="loading">Loading...</div>
      ) : (
        user !== undefined && (
          <div>
            <div className="header">
              <span data-testid="resolved">
                <h1>Member {user.name}</h1>
              </span>
            </div>

            <div className="back">
              <button className="back-btn" onClick={navBack}>{`< Back to team`}</button>
            </div>

            <h2>Username:</h2>
            <div className="username">
              <p>{user.username}</p>
            </div>

            <h2>Member of:</h2>
            <ul className="list">
              {teamNames.map((name, index) => (
                <li className="list-item" key={index}>
                  <div className="username">{name}</div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  )
}
