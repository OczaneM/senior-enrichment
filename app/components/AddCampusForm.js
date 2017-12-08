import React, { Component } from 'react'
import store from '../store'

export default class AddCampusForm extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState()
    this.state.value = ''
  }

  render () {
    return (
      <div>
        <center>
          <label>ADD A CAMPUS</label>
          <form id="new-campus-form">
            <label>Campus name </label>
            <input name="campusName" type="text" placeholder="New Campus Name" value={this.state.value} /><br />
            <label>Campus Image </label>
            <input name="campuseImage" type="url" placeholder="imgUrl" /><br />
            <textarea name="campusDesc" rows="4" cols="35" defaultValue="Brief campus decription" />
          </form>
        </center>
      </div>
    )
  }
}
