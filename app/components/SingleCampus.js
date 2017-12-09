import React from 'react'
import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage';

export default function SingleCampus (props) {
  let campusToView = props.campusArray.find((campus) => campus.id == props.match.params.id)
  return (
    <div>
      { campusToView &&
        <div>
          <DisplayImage campusImage={campusToView} />
          <p>Name: {campusToView.name}</p>
          <p>Description: {campusToView.description}</p>
          <label>Students</label><br />
          <Link to={`/campuses/${campusToView.id}/editCampus`} >
             <button type="submit">Edit Campus</button>
          </Link>
        </div>
      }
    </div>
  )
}
