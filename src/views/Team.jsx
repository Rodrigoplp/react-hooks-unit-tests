// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'
import FilterForm from '../components/FilterForm.jsx'

export default function User({ teamId }) {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [team, setTeam] = useState([])
	let [filteredTeams, setFilteredTeams] = useState([])

	// MARK: Effect
	// MARK: - Load user info from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/team/2')
				if (result.data) {
					setTeam(result.data)
				}
				setLoading(false)
			}
			catch(err) {
				setLoading(false)
				console.log('Fetch data error: ' + err)
			}
		}

		fetchData()
	}, [teamId])

	// MARK: Callbacks
	// let filterCallback = (e) => {
	// 	let filtered = teams.filter(team => {
	// 		return team.name.toUpperCase().includes(e.target.value.toUpperCase())
	// 	})

	// 	setFilteredTeams(filtered)
	// }

	// MARK: Return
	return (
		<div className='user'>
			<h1>Team</h1>

			{teamId !== undefined &&
				<p>{teamId}</p>
			}

			{loading ? (<div>Loading...</div>) : (
				team !== undefined &&	
				<h2>{team.name}</h2>
			)}
		</div>
	)
}
