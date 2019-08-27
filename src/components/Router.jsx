import React, { useState } from 'react'
import { Router as ReactRouter, Route, Switch } from 'react-router-dom'
import history from '../history.js'
import Home from '../views/Home'
import Team from '../views/Team'
import Member from '../views/Member'
import config from '../config.json'

history.listen(() => {
  window.scrollTo(0, 0)
})

export default function Router() {
  // let [team, setTeam] = useState([])
  // let [users, setUsers] = useState([])
  let [memberProps, setMemberProps] = useState({})
  let [teamProps, setTeamProps] = useState({})

  let teamCallback = (teamId, users, teams) => {
    // Remove this:
    // setTeam(teamId)

    // Leave:
    setTeamProps({
      url: config.api + '/team/' + teamId.id,
      team: teamId,
      teams: teams,
      users: users,
      cb: userIdCallback
    })
  }

  let userIdCallback = (el, teams) => {
    setMemberProps({
      url: config.api + '/user/' + el,
      teams: teams
    })
  }

  // <Route
  //   exact
  //   path="/team"
  //   render={props => <Team teamProps={team} usersProps={users} userIdCallback={userIdCallback} {...props} />}
  // />

  return (
    <ReactRouter history={history}>
      <Switch>
        <Route exact path="/" render={props => <Home teamCallback={teamCallback} {...props} />} />

        <Route exact path="/team" render={() => <Team props={teamProps} />} />

        <Route exact path="/member" render={() => <Member props={memberProps} />} />
      </Switch>
    </ReactRouter>
  )
}
