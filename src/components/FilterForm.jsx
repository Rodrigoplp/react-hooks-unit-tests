import React from 'react'
import './FilterForm.scss'

export default function FilterForm({ filterCallback }) {
  return (
    <form>
      <div className="form-group">
        <input placeholder="Filter" onChange={filterCallback} />
      </div>
    </form>
  )
}
