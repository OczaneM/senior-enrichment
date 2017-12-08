import React, { Component } from 'react'
import store from '../store'
import { Link } from 'react-router-dom'

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
        <label>Campus List</label>
        {this.state.campuses.map( campus => {
          return (
            <Link to={`/campuses/${campus.id}`}>
              <p><DisplayImage campusImage={campus.imageUrl} />
              {campus.name}</p>
            </Link>
          )
        })}
      </div>
    )
  }
}
