import React, { Component } from 'react'
//import store from '../store'
import { BrowserRouter as Router } from 'react-router-dom'

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  render () {
    console.log('Main rendering')
    return (
      <p>Hello!</p>
    )
  }

}
