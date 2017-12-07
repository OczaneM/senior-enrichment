import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {Browserouter} from 'react-router-dom'
import Main from './components'
import store from './reducers'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
