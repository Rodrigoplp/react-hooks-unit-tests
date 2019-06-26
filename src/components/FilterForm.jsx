import React from 'react'

export default function FilterForm({ filterCallback }) {
	let updateInput = (e) => {
		e.preventDefault()
		console.log(JSON.stringify(e, 0, 2))
		filterCallback(e)
	}

	return (
		<form>
			<div className="form-group">
				<label htmlFor="title">Filter </label>
				<input onChange={filterCallback} />
			</div>
		</form>
	)
}
