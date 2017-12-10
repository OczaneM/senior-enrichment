import React, { Component } from 'react'
import store, { writeStudentInfo, updateAStudent } from '../store'

export default class EditStudentForm extends Component {
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
      if (event.target.name === "studentGPA"){
        let convertedNum = Number(event.target.value)
        store.dispatch(writeStudentInfo([event.target.name, convertedNum]))
      }
      else {
        store.dispatch(writeStudentInfo([event.target.name, event.target.value]))
      }
    }

    handleSubmit (event) {
      event.preventDefault()

      //constructing the request body for put requet
      const studentInfo = {}
      studentInfo.id = this.props.match.params.id
      studentInfo.campusId = event.target.campus.value
      if (this.state.studentFirstName.length > 0) {studentInfo.firstName = event.target.studentFirstName.value}
      if (this.state.studentLastName.length > 0) {studentInfo.lastName = event.target.studentLastName.value}
      if (this.state.studentEmail.length > 0) {studentInfo.email = event.target.studentEmail.value}
      if (this.state.studentGPA >= 0)
      {
        let convertedNum = Number(event.target.studentGPA.value)
        studentInfo.gpa = convertedNum
      }

      store.dispatch(updateAStudent(studentInfo))

      //resetting student information entries
      store.dispatch(writeStudentInfo(['studentFirstName', '']))
      store.dispatch(writeStudentInfo(['studentLastName', '']))
      store.dispatch(writeStudentInfo(['studentEmail', '']))
      store.dispatch(writeStudentInfo(['studentGPA', 0]))
    }

  render () {
    let studentToEdit = this.state.students.find( student => student.id == this.props.match.params.id)
    return (
      <div>
        <label>Edit this student</label>
        { studentToEdit &&
          <form id="edit-student-form" onSubmit={this.handleSubmit}>
            <input name="studentFirstName" type="text" placeholder={studentToEdit.firstName} value={this.state.studentFirstName} onChange={this.handleChange} />
            <br />
            <input name="studentLastName" type="text" placeholder={studentToEdit.lastName} value={this.state.studentLastName} onChange={this.handleChange} />
            <br />
            <input name="studentEmail" type="text" placeholder={studentToEdit.email} value={this.state.studentEmail} onChange={this.handleChange} />
            <br />
            <input name="studentGPA" type="number" placeholder={studentToEdit.gpa} value={this.state.studentGPA} onChange={this.handleChange} min="0" max="4" />
            <br />
            <select name="campus">
              {this.state.campuses.map( campus => {
                return (
                    <option key={campus.id} value={campus.id}>
                      {campus.name}
                    </option>
                )
              })}
            </select>
            <br />
            <button type="submit" >Submit</button>
          </form>
        }
      </div>
    )
  }
}
