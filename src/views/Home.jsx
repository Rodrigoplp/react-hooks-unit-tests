// MARK: Definitions
import React, { useState, useEffect } from 'react'
import history from '../history.js'
import axios from 'axios'
import config from '../config.json'
import TeamList from '../components/TeamList.jsx'
import FilterForm from '../components/FilterForm.jsx'
import './Home.scss'

export default function Home(props) {
  // MARK: State
  let [loading, setLoading] = useState(true)
  let [loadingUsers, setLoadingUsers] = useState(true)
  let [teams, setTeams] = useState([])
  let [users, setUsers] = useState([])
  let [filteredTeams, setFilteredTeams] = useState([])

  // MARK: Effects

  // MARK: - Load teams
  useEffect(() => {
    let fetchData = async () => {
      setLoading(true)
      try {
        let result = await axios(config.api + '/team/')
        if (result.data) {
          setTeams(result.data)
          setFilteredTeams(result.data)
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // MARK: - Load users
  useEffect(() => {
    let fetchData = async () => {
      setLoadingUsers(true)
      try {
        let result = await axios(config.api + '/user/')
        if (result.data) {
          setUsers(result.data)
        }
        setLoadingUsers(false)
      } catch (err) {
        setLoadingUsers(false)
      }
    }

    fetchData()
  }, [])

  // MARK: Callbacks

  let selectTeam = selectedTeam => {
    props.teamCallback(selectedTeam, users, teams)
    props.usersCallback(users)
    history.push('/team')
  }

  let selectUser = selectedUser => {
    console.log('Selected user ' + selectedUser)
  }

  let filterCallback = e => {
    let filtered = teams.filter(team => {
      return team.name.toUpperCase().includes(e.target.value.toUpperCase())
    })

    setFilteredTeams(filtered)
  }

  // MARK: Return
  return (
    <div className="home">
      <div className="header">
        <h1>Tempo teams</h1>
      </div>

      <FilterForm filterCallback={filterCallback} />

      {loading || loadingUsers ? (
        <div>Loading...</div>
      ) : (
        teams !== undefined && (
          <TeamList teams={filteredTeams} users={users} selectTeam={selectTeam} selectUser={selectUser} />
        )
      )}
    </div>
  )
}
