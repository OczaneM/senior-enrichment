import React from 'react'
import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage';

export default function SingleCampus (props) {
  let campusToView = props.campusArray.find((campus) => campus.id == props.match.params.id)
  let campusStudents = props.studentArray.filter( student => student.campusId == props.match.params.id)

  return (
    <div>
      { campusToView &&
        <div>
          <DisplayImage campusImage={campusToView} />
          <p>Name: {campusToView.name}</p>
          <p>Description: {campusToView.description}</p>
          <label>Students</label><br />

          {/*List out the students belonging to this campus*/}
          { campusStudents.map( (student, index) => {
            return (
              <Link to={`/students/${student.id}`} key={student.id} >
              <p>{index + 1}. {student.firstName}</p>
              </Link>
              )
            })
          }

          <Link to={`/campuses/${campusToView.id}/editCampus`} >
             <button type="submit">Edit Campus</button>
          </Link>
        </div>
      }
    </div>
  )
}
