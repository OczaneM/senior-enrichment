import React, { Component } from 'react'
import store, { deleteACampus } from '../store'
import { Link } from 'react-router-dom'
import DisplayImage from './DisplayImage'
import AddCampusForm from './AddCampusForm'


export default class CampusList extends Component {
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
    let campus = {
      id: event.target.value
    }
    store.dispatch(deleteACampus(campus))
  }

  render () {
    return (
      <div>
        <AddCampusForm />
        <label>Campus List</label>
        {this.state.campuses.map( campus => {
          return (
            <p>
              <Link to={`/campuses/${campus.id}`} key={campus.id}>
                <p><DisplayImage campusImage={campus.imageUrl} /></p>
                  {campus.name}
              </Link>
              <button type="submit" value={campus.id} onClick={this.handleClick} >Delete</button>
            </p>
          )
        })}
      </div>
    )
  }
}
