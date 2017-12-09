import React, { Component } from 'react'
import store, { addNewCampus, writeCampusInfo } from '../store'

export default class AddCampusForm extends Component {
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
    store.dispatch(writeCampusInfo([event.target.name, event.target.value]))
  }


  handleSubmit (event) {
    event.preventDefault()
    //creating requet body for post request
    const campusInfo = {
      name: event.target.campusNameEntry.value,
      imageUrl: event.target.campusImageEntry.value,
      description: event.target.campusDescEntry.value
    }
    store.dispatch(addNewCampus(campusInfo))

    //resetting campus information entries
    store.dispatch(writeCampusInfo(['campusNameEntry', '']))
    store.dispatch(writeCampusInfo(['campusImageEntry', '']))
    store.dispatch(writeCampusInfo(['campusDescEntry', '']))
  }

  render () {
    return (
      <div>
        <center>
          <label>ADD A CAMPUS</label>
          <form id="new-campus-form" onSubmit={this.handleSubmit} >
            <label>Campus name </label>

            <input name="campusNameEntry" type="text" placeholder="New Campus Name" value={this.state.campusNameEntry} onChange={this.handleChange} /><br />

            <label>Campus Image </label>
            <input name="campusImageEntry" type="url" placeholder="imgUrl" value={this.state.campusImageEntry} onChange={this.handleChange} /><br />

            <textarea name="campusDescEntry" rows="4" cols="35" placeholder="Brief campus decription" value={this.state.campusDescEntry} onChange={this.handleChange} /><br />
            <button type="submit" className="btn submit">Submit</button>
          </form>
        </center>
      </div>
    )
  }
}
