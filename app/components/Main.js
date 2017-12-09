import React, { Component } from 'react'
import store, { fetchStudents, fetchCampuses } from '../store'
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import Navbar from './Navbar'
import CampusList from './CampusList'
import SingleCampus from './SingleCampus'

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = store.getState()
  }

  componentDidMount () {
    store.dispatch(fetchStudents())
    store.dispatch(fetchCampuses())
    this.unsubscribe = store.subscribe( () => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }


  render () {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/campuses" component={CampusList} />
          <Route path="/campuses/:id" render={(props) => (<SingleCampus {...props} campusArray={this.state.campuses} />)} />
        </Switch>
      </div>
    )
  }

}
