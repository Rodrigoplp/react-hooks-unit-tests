// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from '../history.js'
import FilterForm from '../components/FilterForm.jsx'
import './Team.scss'

export default function Team({ props }) {
  // MARK: State
  let [team, setTeam] = useState(null)
  let [members, setMembers] = useState([])
  let [filteredMembers, setFilteredMembers] = useState([])

  // MARK: Effect
  // MARK: - Load user info from Tempo backend on initialization
  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get(props.url)
        if (result.data) {
          setTeam(result.data)

          result.data.members.map(memberId => {
            let arr = props.users.filter(el => el.id === memberId)
            if (arr[0] !== undefined) {
              let tupple = {
                name: arr[0].name,
                id: memberId
              }
              setMembers(t => [...t, tupple])
              setFilteredMembers(t => [...t, tupple])
            } else {
              history.push('/')
            }

            return null
          })
        } else {
          history.push('/')
        }
      } catch (err) {
        console.log('Fetch data error:', err, JSON.stringify(props))
      }
    }

    fetchData()
  }, [props])

  // MARK: Helpers
  let userData = userId => {
    if (props.users === undefined) {
      history.push('/')
    } else {
      let arr = props.users.filter(el => el.id === userId)

      if (arr[0] !== undefined) {
        return arr[0].name
      } else {
        history.push('/')
      }
    }
  }

  let selectUser = id => {
    props.cb(id, props.teams)
    history.push('/member')
  }

  let filterCallback = e => {
    let filtered = members.filter(member => {
      return member.name.toUpperCase().includes(e.target.value.toUpperCase())
    })

    setFilteredMembers(filtered)
  }

  let navBack = () => {
    history.push('/')
  }

  // MARK: Return
  return (
    <div className="team">
      {team === null ? (
        <div data-testid="loading">Loading...</div>
      ) : (
        <div>
          {props.team !== undefined && (
            <div className="header">
              <h1>Team {props.team.name}</h1>
            </div>
          )}

          <div className="back">
            <button className="back-btn" onClick={navBack}>{`< Back to teams`}</button>
          </div>

          <FilterForm filterCallback={filterCallback} />

          <div>
            <h2>Team lead</h2>

            <button data-testid="resolved-lead" className="selector-btn" onClick={() => selectUser(team.lead)}>
              {userData(team.lead)}
            </button>

            <h2>Team members</h2>

            <ul className="list">
              {filteredMembers.map((member, index) => (
                <li className="list-item" key={index}>
                  <button data-testid="resolved-list" className="selector-btn" onClick={() => selectUser(member.id)}>
                    {member.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
