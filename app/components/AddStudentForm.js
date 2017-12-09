import React, { Component } from 'react'
import store, { writeStudentInfo, addNewStudent } from '../store'

export default class AddStudentForm extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleChange (event) {
    store.dispatch(writeStudentInfo([event.target.name, event.target.value]))
  }

  handleSubmit (event) {
    event.preventDefault()
    //making request body for students post request
    const studentInfo = {
      firstName: event.target.studentFirstName.value,
      lastName: event.target.studentLastName.value,
      email: event.target.studentEmail.value,
      gpa: event.target.studentGPA.value,
      campusId: event.target.campus.value
    }
    store.dispatch(addNewStudent(studentInfo))
    //resetting student information entries
    store.dispatch(writeStudentInfo(['studenFirstName', '']))
    store.dispatch(writeStudentInfo(['studentLastName', '']))
    store.dispatch(writeStudentInfo(['studentEmail', '']))
    store.dispatch(writeStudentInfo(['studentGPA', 0]))
  }

  render () {
    return (
      <div>
        <label>Add a Student</label>
        <form id="new-student-form" onSubmit={this.handleSubmit} >
          <label>First name </label>
          <input name="studentFirstName" type="text" placeholder="Firstname" value={this.state.studentFirstName} onChange={this.handleChange} />
          <br />
          <label>Last name </label>
          <input name="studentLastName" type="text" placeholder="Lastname" value={this.state.studentLastName} onChange={this.handleChange} />
          <br />
          <label>Email</label>
          <input type="txt" name="studentEmail" placeholder="email" value={this.state.studentEmail} onChange={this.handleChange} />
          <br />
          <label>GPA </label>
          <input name="studentGPA" type="text" placeholder="0 - 4" value={this.state.studentGPA} onChange={this.handleChange} />
          <br />
          <label>Campus </label>
          <select name="campus">
          { this.state.campuses.length && this.state.campuses.map( campus => {
            return (
              <option key={campus.id} value={campus.id} >
                {campus.name}
              </option>
            )
          })}
          </select>
          <br />
          <button type="submit" >Submit</button>
        </form>
      </div>
    )
  }
}
