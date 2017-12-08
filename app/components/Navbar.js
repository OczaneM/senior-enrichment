import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar () {

  return (
    <div>
      <NavLink to="/students">
        Students
      </NavLink>
      <NavLink to="/campuses">
        Campuses
      </NavLink>
      <NavLink to="/">
        Home
      </NavLink>
    </div>
  )
}
