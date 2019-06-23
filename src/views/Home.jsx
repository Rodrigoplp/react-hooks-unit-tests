import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'

export default function Home() {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [teams, setTeams] = useState([])
	let [members, setMembers] = useState([])
	let [teamDetails, setTeamDetails] = useState([])

	// MARK: Effects
	// MAKR: - Load data from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/team/')
				if (result.data) {
					setTeams(result.data)
					console.log('Backend ok')
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
}

