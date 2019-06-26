import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'
import Team from '../components/Team.jsx'

export default function Home() {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [loadingDetails, setLoadingDetails] = useState(true)
	let [loadingUsers, setLoadingUsers] = useState(true)
	let [teams, setTeams] = useState([])
	let [users, setUsers] = useState([])
	let [teamDetails, setTeamDetails] = useState([])

	// MARK: Effects
	
	// MARK: - Load teams from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/team/')
				if (result.data) {
					console.log('teams fetched')
					setTeams(result.data)
				}
				setLoading(false)
			}
			catch(err) {
				setLoading(false)
				console.log('Fetch data error: ' + err)
			}
		}

		fetchData()
	}, [])

	// MARK: - Load teams' details
	useEffect(() => {
		let fetched = 0

		teams.map(team => {
			let fetchData = async() => {
				try {
					setLoadingDetails(true)
					let result = await axios(config.api + '/team/' + team.id)
					if (result.data) {
						fetched++
						setTeamDetails(t => [...t, result.data])
						if (fetched === teams.length) {
							setLoadingDetails(false)
						}
					}
				}
				catch(err) {
					fetched++
					if (fetched === teams.length) {
							setLoadingDetails(false)
					}
					console.log('Fetch data error: ' + err)
				}
			}

			fetchData()

			return null
		})
	}, [teams])

	// MARK: - Load users
	useEffect(() => {
		let fetchData = async() => {
			setLoadingUsers(true)
			try {
				let result = await axios(config.api + '/user/')
				if (result.data) {
					setUsers(result.data)
				}
				setLoadingUsers(false)
			}
			catch(err) {
				setLoadingUsers(false)
				console.log('Fetch data error: ' + err)
			}
		}

		fetchData()
	}, [])

	// MARK: Callbacks

	let selectTeam = (selectedTeam) => {
		console.log('Selected team ' + selectedTeam)
	}

	let selectUser = (selectedUser) => {
		console.log('Selected user ' + selectedUser)
	}

	// MARK: Return
	return (
		<div className='home'>
			<h1>Tempo</h1>

			{loading || loadingUsers ? (<div>Loading...</div>) : (
				teams !== undefined &&
				<Team
					teams = {teams} 
					users = {users}
					selectTeam = {selectTeam}
					selectUser = {selectUser}
				/>
			)}

			{loadingDetails || loadingUsers ? (<div>Loading...</div>) : (
				teamDetails !== undefined &&
				<div className='details'>
					<ul className='list'>
						{teamDetails.map(team => (
							<li className = 'list-item' key={team.id}>
								{ team.members.length}
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	)
}
