import React, { useState } from 'react'
import { Router as ReactRouter, Route, Switch } from 'react-router-dom'
import history from '../history.js'
import Home from '../views/Home'
import Team from '../views/Team'
import Member from '../views/Member'
import config from '../config.json'

history.listen(location => {
	window.scrollTo(0,0)
})

export default function Router(props) {
	let [team, setTeam] = useState([])
	let [allTeams, setAllTeams] = useState([])
	let [users, setUsers] = useState([])
	let [memberProps, setMemberProps] = useState({})
	
	let teamCallback = (el) => {
		setTeam(el)
	}

	let usersCallback = (el) => {
		setUsers(el)
	}

	let userIdCallback = (el) => {
		setMemberProps({
			url: config.api + '/user/' + el,
			teams: allTeams
		})
	}

	let allTeamsCallback = (el) => {
		setAllTeams(el)
	}

	return (
		<ReactRouter history = { history }>
			<Switch>
				<Route 
					exact path='/' 
					render={(props) => <Home teamCallback={teamCallback} usersCallback={usersCallback} allTeamsCallback={allTeamsCallback} {...props} />}
				/>
				<Route 
					exact path='/team' 
					render={(props) => <Team teamProps={team} usersProps={users} userIdCallback={userIdCallback} {...props} />}
				/>
				<Route
					exact path='/member'
					render={(props) => <Member props={memberProps} />}
				/>
			</Switch>
		</ReactRouter>
	)
}
