import React, { Component } from 'react'
import store, { writeCampusInfo, updateACampus, updateAStudent } from '../store'
//import { Redirect } from 'react-router-dom'

export default class EditCampusForm extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemoveButton = this.handleRemoveButton.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleChange (event) {
    store.dispatch(writeCampusInfo([event.target.name, event.target.value]))
  }

  handleSubmit (event) {
    event.preventDefault()
    //creating request body for put request
    const campusInfo = {}
    campusInfo.id = this.props.match.params.id
    if (this.state.campusNameEntry.length > 0) {campusInfo.name = event.target.campusNameEntry.value}
    if (this.state.campusImageEntry.length > 0) {campusInfo.imageUrl = event.target.campusImageEntry.value}
    if (this.state.campusDescEntry.length > 0) {campusInfo.description = event.target.campusDescEntry.value}
    store.dispatch(updateACampus(campusInfo))

    //resetting campus information entries
    store.dispatch(writeCampusInfo(['campusNameEntry', '']))
    store.dispatch(writeCampusInfo(['campusImageEntry', '']))
    store.dispatch(writeCampusInfo(['campusDescEntry', '']))
  }

  handleRemoveButton (event) {
    let student = {
      id: event.target.value,
      campusId: null
    }
    store.dispatch(updateAStudent(student))
  }

  handleAddButton (event) {
    //Verifying that student belongs to our roster
    let isAStudent = this.state.students.find( student => student.fullname == event.target.value)
    //Verifying that student does not already belong to this campus
    let alreadyCampusStudent = this.state.students.find( student => student.campusId == this.props.match.params.id)
    if (!isAStudent) alert("Student does not belong to our roster")
    else if (alreadyCampusStudent) {
      alert("Student is already in this campus")
    }
    else {
      let student = {
        id: isAStudent.id,
        campusId: this.props.match.params.id
      }
      store.dispatch(updateAStudent(student))
      store.dispatch(writeCampusInfo(['campusStudentEntry', '']))
    }
  }

  render () {
    let campusToEdit = this.state.campuses.find((campus) => campus.id == this.props.match.params.id)
    let campusStudents = this.state.students.filter( student => student.campusId == this.props.match.params.id)
    return (
      <div>
        { campusToEdit &&
          <div>
            <label>Edit this campus</label>
            <form id="edit-campus-form" onSubmit={this.handleSubmit}>
              <input name="campusNameEntry" type="text" placeholder={campusToEdit.name} value={this.state.campusNameEntry} onChange={this.handleChange} /><br />

              <input name="campusImageEntry" type="url" placeholder={campusToEdit.imageUrl} value={this.state.campusImageEntry} />
              <br />

              <textarea name="campusDescEntry" rows="4" cols="50" placeholder={campusToEdit.description} value={this.state.campusDescEntry} onChange={this.handleChange} />
              <br /><br />
              <label>Campus Students: </label>
              <br />
              {
                campusStudents.length >= 1 &&
                campusStudents.map( (campusStudent, index) => {
                  return (
                    <div>
                      {index + 1}. {campusStudent.fullname}
                      <button type="button" value={campusStudent.id} onClick={this.handleRemoveButton} >Remove</button>
                    </div>
                  )
                })
              }
              <br />
              <label>Add a student: </label>
                <input name="campusStudentEntry" type="text" placeholder="Student Full Name" value={this.state.campusStudentEntry} onChange={this.handleChange} />
                <button type="button" value={this.state.campusStudentEntry} onClick={this.handleAddButton}>Add</button>
                <br /><br />
              <button type="submit" className="btn submit">Submit</button>
            </form>
          </div>
        }
      </div>
    )
  }
}
