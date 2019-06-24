import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'
import Team from '../components/Team.jsx'

export default function Home() {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [loadingDetails, setLoadingDetails] = useState(true)
	let [teams, setTeams] = useState([])
	let [members, setMembers] = useState([])
	let [teamDetails, setTeamDetails] = useState([])

	// MARK: Effects
	
	// MAKR: - Load teams from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/team/')
				if (result.data) {
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
		teams.map(team => {
			let fetchData = async() => {
				try {
					setLoadingDetails(true)
					let result = await axios(config.api + '/team/' + team.id)
					if (result.data) {
						console.log(JSON.stringify(result.data))
						setTeamDetails(t => [...t, result.data])
					}
					setLoadingDetails(false)
				}
				catch(err) {
					setLoadingDetails(false)
					console.log('Fetch data error: ' + err)
				}
			}

			fetchData()
		})
	}, [teams])

	// MARK: Return
	return (
		<div className='home'>
			<h1>Tempo</h1>

			{loading ? (<div>Loading...</div>) : (
				teams !== undefined &&
				<Team teams={ teams } />
			)}

			{loadingDetails ? (<div>Loading...</div>) : (
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
