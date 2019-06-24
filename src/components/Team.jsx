import React from 'react'

export default function Team({ teams, select }) {
	return (
		<div className='teams'>
			<ul className='list'>
				{teams.map(team => (
					<li className = 'list-item' key={team.id}>
						<button onClick={() => select(team.name)}>
							{ team.name }
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
