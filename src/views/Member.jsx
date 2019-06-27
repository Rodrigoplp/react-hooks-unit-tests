// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from  '../history.js'
import config from '../config.json'

// teamProps, usersProps, userIdCallback
export default function Member(props) {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [user, setUser] = useState([])
	let [teamNames, setTeamNames] = useState([])

	// MARK: Effect
	// MARK: - Load user info from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/user/' + props.userId)
				if (result.data) {
					setUser(result.data)

					result.data.member_teams.map(teamId => {
						let arr = props.teams.filter(el => el.id === teamId)
						setTeamNames(t => [...t, arr[0].name])

						return null
					})
				}
				setLoading(false)
			}
			catch(err) {
				setLoading(false)
				console.log('Fetch data error: ' + err)
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
		<div className='user'>
			<button onClick={navBack}>Back</button>



			{loading ? (<div>Loading...</div>) : (
				user !== undefined &&
				<div>
					<h1>{user.name}</h1>

					<h2>Username:</h2>
					<p>{user.username}</p>

					<h2>Member of:</h2>
					<ul className='list'>
						{teamNames.map((name, index) => (
							<li className = 'list-item' key={index}>
								{name}	
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	)
}
