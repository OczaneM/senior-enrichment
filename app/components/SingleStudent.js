import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleStudent (props) {
  let studentToView = props.studentArray.find( student => student.id == props.match.params.id)
  console.log(studentToView)
  return (
    <div>
      { studentToView &&
        <div>
          <label>Student Profile</label>
          <p>Name: {studentToView.fullname}</p>
          <p>e-mail: {studentToView.email}</p>
          <p>GPA: {studentToView.gpa}</p>
          <p>Campus: {studentToView.campus.name}</p>
        </div>
      }
    </div>
  )
}
