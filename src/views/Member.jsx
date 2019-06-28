// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from  '../history.js'
import config from '../config.json'
import './Member.scss'

// teamProps, usersProps, userIdCallback
export default function Member(props) {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [user, setUser] = useState([])
	let [teamNames, setTeamNames] = useState([])

	// MARK: Effects
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
		<div className='member'>

			{loading ? (<div>Loading...</div>) : (
				user !== undefined &&
				<div>
					<div className='header'>
						<h1>Member {user.name}</h1>
					</div>

					<div className='back'>
						<button className='back-btn' onClick={navBack}>{`< Back to team`}</button>
					</div>

					<h2>Username:</h2>
					<div className='username'>
						<p>{user.username}</p>
					</div>

					<h2>Member of:</h2>
					<ul className='list'>
						{teamNames.map((name, index) => (
							<li className='list-item' key={index}>
								<div className='username'>
									{name}
								</div>
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	)
}
