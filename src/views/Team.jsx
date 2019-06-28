// MARK: Definitions
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import history from  '../history.js'
import config from '../config.json'
import FilterForm from '../components/FilterForm.jsx'
import './Team.scss'

// teamProps, usersProps, userIdCallback
export default function Team(props) {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [team, setTeam] = useState([])
	let [members, setMembers] = useState([])
	let [filteredMembers, setFilteredMembers] = useState([])

	// MARK: Effect
	// MARK: - Load user info from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/team/' + props.teamProps.id)
				if (result.data) {
					setTeam(result.data)

					result.data.members.map(memberId => {
						let arr = props.usersProps.filter(el => el.id === memberId)
						if (arr[0] !== undefined) {
							let tupple = {
								name: arr[0].name,
								id: memberId
							}
							setMembers(t => [...t, tupple])
							setFilteredMembers(t => [...t, tupple])
						}
						else {
							history.push('/')
						}

						return null
					})
				}
				else {
					history.push('/')
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
		if (arr[0] !== undefined) {
			return arr[0].name
		}
		else {
			history.push('/')
		}
	}

	let selectUser = (id) => {
		props.userIdCallback(id)
		history.push('/member')
	}

	let filterCallback = (e) => {
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
		<div className='team'>

			{props.teamProps !== undefined &&
				<div className='header'>
					<h1>Team {props.teamProps.name}</h1>
				</div>
			}

			<div className='back'>
				<button className='back-btn' onClick={navBack}>{`< Back to teams`}</button>
			</div>

			<FilterForm filterCallback = { filterCallback } />

			{loading ? (<div>Loading...</div>) : (
				team !== undefined &&	
				<div>
					<h2>Team lead</h2>

					<button className='selector-btn' onClick={() => selectUser(team.lead)}>
						{userData(team.lead)}
					</button>

					<h2>Team members</h2>

					<ul className='list'>
						{filteredMembers.map((member, index) => (
							<li className = 'list-item' key={index}>
								<button className='selector-btn' onClick={() => selectUser(member.id)}>
									{member.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	)
}
