import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar () {

  return (
    <div>
      <label>Naviation</label>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/students">
        <p>Students</p>
      </Link>
      <Link to="/campuses">
        <p>Campuses</p>
      </Link>
    </div>
  )
}
