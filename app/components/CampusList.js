import React, { Component } from 'react'
import store from '../store'
import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage'
import AddCampusForm from './AddCampusForm'


export default class CampusList extends Component {
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
        <AddCampusForm />
        <label>Campus List</label>
        {this.state.campuses.map( campus => {
          return (
            <Link to={`/campuses/${campus.id}`} key={campus.id}>
              <p><DisplayImage campusImage={campus.imageUrl} /></p>
              <p>{campus.name}</p>
            </Link>
          )
        })}
      </div>
    )
  }
}
