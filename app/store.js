import axios from 'axios'
import {
  createStore,
  applyMiddleware} from 'redux'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Initial State
const initialState = {
  students: [],
  campuses: []
}

//Action Types
const GET_STUDENTS = 'GET_STUDENTS'
const GET_CAMPUSES = 'GET_CAMPUSES'

//Action Creators
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students}
  return action
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses}
  return action
}

//Thunk Creators
export function fetchStudents () {
  return function (dispatch) {
    axios.get('/api/students')
      .then( res => res.data)
      .then( students => {
        const action = getStudents(students)
        dispatch(action)
      })
  }
}

//Reducer
function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.students
      }
    default:
      return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware)))
