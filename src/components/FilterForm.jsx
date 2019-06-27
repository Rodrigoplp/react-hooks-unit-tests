import React from 'react'

export default function FilterForm({ filterCallback }) {
	return (
		<form>
			<div className="form-group">
				<label htmlFor="title">Filter </label>
				<input onChange={filterCallback} />
			</div>
		</form>
	)
}
