import React from 'react'

export default function Team({ teams }) {
	return (
		<div className='teams'>
			<ul className='list'>
				{teams.map(team => (
					<li className = 'list-item' key={team.id}>
						{ team.name }
					</li>
				))}
			</ul>
		</div>
	)
}
