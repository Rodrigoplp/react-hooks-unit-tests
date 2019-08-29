// MARK: Definitions
import React, { useState, useEffect } from 'react'
import history from '../history.js'
import axios from 'axios'
import TeamList from '../components/TeamList.jsx'
import FilterForm from '../components/FilterForm.jsx'
import './Home.scss'

export default function Home({ props }) {
  // MARK: State
  let [teams, setTeams] = useState(null)
  let [users, setUsers] = useState(null)
  let [filteredTeams, setFilteredTeams] = useState([])

  // MARK: Effects

  // MARK: - Load teams
  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get(props.teamUrl)
        if (result.data) {
          setTeams(result.data)
          setFilteredTeams(result.data)
        }
      } catch (err) {
        console.log('Error loading users', err)
      }
    }

    fetchData()
  }, [props])

  // MARK: - Load users
  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get(props.userUrl)
        if (result.data) {
          setUsers(result.data)
        }
      } catch (err) {
        console.log('Error loading teams', err)
      }
    }

    fetchData()
  }, [props])

  // MARK: Callbacks

  let selectTeam = selectedTeam => {
    props.cb(selectedTeam, users, teams)
    history.push('/team')
  }

  let filterCallback = e => {
    let filtered = teams.filter(team => {
      return team.name.toUpperCase().includes(e.target.value.toUpperCase())
    })

    setFilteredTeams(filtered)
  }

  //

  // MARK: Return
  return (
    <div className="home">
      {users === null || teams === null ? (
        <div data-testid="loading">Loading...</div>
      ) : (
        teams !== undefined && (
          <div data-testid="content">
            <div data-testid="resolved" className="header">
              <h1>Tempo teams</h1>
            </div>

            <FilterForm filterCallback={filterCallback} />

            <TeamList teams={filteredTeams} selectTeam={selectTeam} />
          </div>
        )
      )}
    </div>
  )
}
