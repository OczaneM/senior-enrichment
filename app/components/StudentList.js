import React, { Component } from 'react'
import store from '../store'
import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage'
import AddStudentForm from './AddStudentForm'

export default class StudentList extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    return (
      <div>
        <center>
          <AddStudentForm />
          <br />
          <label>Student List</label>
          {
            this.state.students.map( (student, index) => {
              return (
                <Link to={`/students/${student.id}`} key={student.id} >
                <p>{index + 1}. {student.fullname}</p>
                </Link>
              )
            })
          }
        </center>
      </div>
    )
  }
}
