import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
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
const ADD_CAMPUS = 'ADD_CAMPUS'
const ADD_STUDENT = 'ADD_CAMPUS'

//Action Creators
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students}
  return action
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses}
  return action
}

export function addCampus (campus) {
  const action = { type: ADD_CAMPUS, campus}
  return action
}

export function addStudent (student) {
  const action = { type: ADD_STUDENT, student}
  return action
}

//Thunk Creators
export function fetchStudents () {
  return function (dispatch) {
    return axios.get('/api/students')
    .then( res => res.data )
    .then (students => {
      const action = getStudents(students)
      dispatch(action)
    })
  }
}

export function fetchCampuses () {
  return function (dispatch) {
    axios.get('/api/campuses')
      .then( res => res.data )
      .then( campuses => {
        const action = getCampuses(campuses)
        dispatch(action)
      })
  }
}

export function addNewCampus (campus) {
  return function thunk (dispatch) {
    console.log("FLAG: ", dispatch)
    return axios.post('/api/campuses', campus)
      .then( res => res.data )
      .then( newCampus => {
        console.log("NewCampus: ", newCampus)
        const action = addCampus(newCampus)
        console.log(action)
        dispatch(action)
      })
  }
}

export function addNewStudent (student) {
  return function (dispatch) {
    return axios.post('/api/students', student)
      .then( res => res.data )
      .then( newStudent => {
        const action = addstudent(newStudent)
        dispatch(action)
      })
  }
}

//Reducer
function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state, //Object.assign
        students: action.students
      }
    case GET_CAMPUSES:
      return {
        ...state,
        campuses: action.campuses
    }
    case ADD_CAMPUS:
      return {
        ...state,
        campuses: [...state.campuses, action.campus]
      }
    case ADD_STUDENT:
    return {
      ...state,
      students: [...state.students, campus]
    }
    default:
      return state
  }
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware)))

export default store
