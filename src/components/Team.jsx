import React from 'react'

export default function Team({ teams, users, selectTeam, selectUser }) {
	return (
		<div className='teams'>
			<ul className='list'>
				{teams.map(team => (
					<li className = 'list-item' key={team.id}>
						<button onClick={() => selectTeam(team.name)}>
							{ team.name }
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
