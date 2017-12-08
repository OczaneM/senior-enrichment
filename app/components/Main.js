import React, { Component } from 'react'
import store, { fetchStudents, fetchCampuses } from '../store'
import { BrowserRouter as Router , Route, Switch} from
 'react-router-dom'

export default class Main extends Component {

  constructor(props) {
    super(props)
    console.log(store)
    this.state = store.getState()
  }

  componentDidMount () {
    const getStudentsThunk = fetchStudents()
    const getCampusesThunk = fetchCampuses()
    store.dispatch(getStudentsThunk)
    store.dispatch(getCampusesThunk)
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }


  render () {
    console.log('Main rendering')
    return (
      <p>Hello!</p>
    )
  }

}
