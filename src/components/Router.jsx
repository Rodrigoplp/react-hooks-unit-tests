import React from 'react'
import { Router as ReactRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

/* Site */
import Home from '../views/Home'
// import Team from '../views/Team'
// import Member from '../views/Member'

const history = createHistory()
history.listen(location => {
	window.scrollTo(0,0)
})

export default function Router(props) {
	return (
		<ReactRouter history = { history }>
			<Switch>
				<Route exact path='/' component={Home} />
			</Switch>
		</ReactRouter>
	)
}

// <Route exact path='/team' render={(props) => <Team {...props} />} />
// <Route exact path='/member' render={(props) => <Member {...props} />} />

// class Router extends React.Component {
//   constructor(props) {
//     super(props)
//   }

// 	componentDidMount() {
// 		ReactGA.pageview(window.location.pathname)
// 	}

//   render() {
// 		return (
// 			<ReactRouter history = { history }>
// 				<Switch>
// 					<Route exact path='/' component={Home} />
// 					<Route exact path='/featured' component={Featured} />
// 					<Route
// 						path="/blog"
// 						render={({ match: { path } }) => (
// 							<div>
// 								<Route exact path={path} render={(props) => <Blog {...props} />} />
// 								<Route path={`${path}/why-we-need-to-do-more-to-protect-our-children`} render={PostDoMore} />
// 							</div>
// 						)}
// 					/>
// 				</Switch>
// 			</ReactRouter>
// 		)
// 	}
// }

// export default Router
