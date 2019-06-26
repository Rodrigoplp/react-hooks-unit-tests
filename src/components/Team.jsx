import React from 'react'

export default function Team({ teams, users, selectTeam, selectUser }) {
	return (
		<div className='teams'>
			<ul className='list'>
				{teams.map(team => (
					<li className = 'list-item' key={team.id}>
						<div>
							<button onClick={() => selectTeam(team.name)}>
								{ team.name }
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
