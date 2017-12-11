import React, { Component } from 'react'
import store, { deleteStudent, deleteAStudent } from '../store'
import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage'
import AddStudentForm from './AddStudentForm'

export default class StudentList extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleClick (event) {
    event.preventDefault()
    let student = {
      id: event.target.value
    }
    store.dispatch(deleteAStudent(student))
  }

  render () {
    return (
      <div>
        <center>
          <AddStudentForm />
          <br /></center>
          <label>Student List</label>
          {
            this.state.students.map( (student, index) => {
              return (
                <p>
                  <Link to={`/students/${student.id}`} key={student.id} >
                  {index + 1}. {student.fullname}
                  </Link>
                  <button type="submit" value={student.id} onClick={this.handleClick} >Delete</button>
                </p>
              )
            })
          }
      </div>
    )
  }
}
