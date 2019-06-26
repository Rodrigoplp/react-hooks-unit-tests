import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'

export default function User({ userId }) {
	// MARK: State
	let [loading, setLoading] = useState(true)
	let [user, setUser] = useState([])

	// MARK: Effect

	// MARK: - Load user info from Tempo backend on initialization
	useEffect(() => {
		let fetchData = async() => {
			setLoading(true)
			try {
				let result = await axios(config.api + '/user/' + userId)
				if (result.data) {
					setUser(result.data)
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

	// MARK: Return
	return (
		<div className='user'>
			<h1>User { userId }</h1>
		</div>
	)
}
