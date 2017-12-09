import React, { Component } from 'react'
import store, { fetchStudents, fetchCampuses } from '../store'
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import Navbar from './Navbar'
import CampusList from './CampusList'
import SingleCampus from './SingleCampus'
import EditCampusForm from './EditCampusForm'
import StudentList from './StudentList'
import SingleStudent from './SingleStudent'

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
          <Route exact path="/campuses/:id" render={(props) => (<SingleCampus {...props} campusArray={this.state.campuses} studentArray={this.state.students} />)} />
          <Route path="/campuses/:id/editCampus" render={(props) => (<EditCampusForm {...props} />)} />
          <Route exact path="/students" component={StudentList} />
          <Route exact path="/students/:id" render={(props) => (<SingleStudent {...props} studentArray={this.state.students} />)} />
        </Switch>
      </div>
    )
  }

}
