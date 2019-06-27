// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from  '../history.js'
import config from '../config.json'
import FilterForm from '../components/FilterForm.jsx'

// teamProps, usersProps, userIdCallback
export default function Team(props) {
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
				let result = await axios(config.api + '/team/' + props.teamProps.id)
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
	}, [props])

	// MARK: Helpers
	let userData = (userId) => {
		let arr = props.usersProps.filter(el => el.id === userId)
		return arr[0].name
	}

	let selectUser = (id) => {
		props.userIdCallback(id)
		history.push('/member')
	}

	let navBack = () => {
		history.push('/')
	}

	// MARK: Return
	return (
		<div className='user'>
			<button onClick={navBack}>Back</button>

			{props.teamProps !== undefined &&
				<h1>{props.teamProps.name}</h1>
			}

			{loading ? (<div>Loading...</div>) : (
				team !== undefined &&	
				<div>
					<h2>Team lead</h2>

					<p>{ userData(team.lead) }</p>

					<h2>Team members</h2>
					
					<ul className='list'>
						{team.members.map((member, index) => (
							<li className = 'list-item' key={index}>
								<button onClick={() => selectUser(member)}>
									{ userData(member) }
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
