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
  let [memberProps, setMemberProps] = useState({})
  let [teamProps, setTeamProps] = useState({})

  let teamCallback = (teamId, users, teams) => {
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

  return (
    <ReactRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => <Home props={teamCallback} />} />

        <Route exact path="/team" render={() => <Team props={teamProps} />} />

        <Route exact path="/member" render={() => <Member props={memberProps} />} />
      </Switch>
    </ReactRouter>
  )
}
