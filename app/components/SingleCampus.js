import React from 'react'
import store from '../store'
import DisplayImage from './DisplayImage';

export default function SingleCampus (props) {
  let singleCampus = props.campusArray.find((campus) => campus.id == props.match.params.id)
  return (
    <div>
      { singleCampus &&
        <div>
          <DisplayImage campusImage={singleCampus} />
          <p>Name: {singleCampus.name}</p>
          <p>Description: {singleCampus.description}</p>
          <label>Students</label>
        </div>
      }
    </div>
  )
}
