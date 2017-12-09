import React, { Component } from 'react'
import store, { addNewCampus } from '../store'

export default class AddCampusForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      campusName: '',
      campusImage: '',
      campusDesc: ''
    }
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
    this.setState({ [event.target.name]: event.target.name.value})
  }


  handleSubmit (event) {
    event.preventDefault()
    const campusBody = {
      name: event.target.campusName.value,
      imageUrl: event.target.campusImage.value,
      description: event.target.campusDesc.value
    }
    store.dispatch(addNewCampus(campusBody))
    this.setState({
      campusName: '',
      campusImage: '',
      campusDesc: ''
    })
  }

  render () {
    console.log(store)
    return (
      <div>
        <center>
          <label>ADD A CAMPUS</label>
          <form id="new-campus-form" onSubmit={this.handleSubmit} >
            <label>Campus name </label>
            <input name="campusName" type="text" placeholder="New Campus Name" value={this.state.campusName} onChange={this.handleChange} /><br />
            <label>Campus Image </label>
            <input name="campusImage" type="url" placeholder="imgUrl" onChange={this.handleChange} /><br />
            <textarea name="campusDesc" rows="4" cols="35" placeholder="Brief campus decription" value={this.campusDesc} onChange={this.handleChange} /><br />
            <button type="submit" className="btn submit">Submit</button>
          </form>
        </center>
      </div>
    )
  }
}
