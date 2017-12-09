import axios from 'axios'
import {createStore, applyMiddleware} from 'redux'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Initial State
const initialState = {
  students: [],
  campuses: [],
  campusNameEntry: '',
  campusImageEntry: '',
  campusDescEntry: '',
  studentFirstName: '',
  studentLastName: '',
  studentEmail: '',
  studentGPA: 0,

}

//Action Types
const GET_STUDENTS = 'GET_STUDENTS'
const GET_CAMPUSES = 'GET_CAMPUSES'
const ADD_CAMPUS = 'ADD_CAMPUS'
const ADD_STUDENT = 'ADD_STUDENT'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const WRITE_CAMPUS_INFO = 'WRITE_CAMPUS_INFO'
const WRITE_STUDENT_INFO = 'WRITE_STUDENT_INFO'

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

export function updateCampus (campus) {
  const action = { type: UPDATE_CAMPUS, campus}
  return action
}

export function updateStudent (student) {
  const action = { type: UPDATE_STUDENT, student}
  return action
}

export function writeCampusInfo (campusInfo) {
  const action = { type: WRITE_CAMPUS_INFO, campusInfo}
  return action
}

export function writeStudentInfo (studentInfo) {
  const action = { type: WRITE_STUDENT_INFO, studentInfo}
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
    return axios.post('/api/campuses', campus)
      .then( res => res.data )
      .then( newCampus => {
        const action = addCampus(newCampus)
        dispatch(action)
      })
  }
}

export function addNewStudent (student) {
  return function (dispatch) {
    return axios.post('/api/students', student)
      .then( res => res.data )
      .then( newStudent => {
        const action = addStudent(newStudent)
        dispatch(action)
      })
  }
}

export function updateACampus (campus) {
  return function (dispatch) {
    axios.put(`/api/campuses/${campus.id}`, campus)
    .then( res => res.data )
    .then( updatedCampus => {
      const action = updateCampus(updatedCampus)
      dispatch(action)
    })
  }
}

export function updatedAstudent (student) {
  return function (dispatch) {
    axios.updated('/api/student', student)
    .then( res => res.data )
    .then (updatedStudent => {
      const action = updateStudent(updatedStudent)
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
    case WRITE_CAMPUS_INFO:
      return {
        ...state,
        [action.campusInfo[0]]: action.campusInfo[1]
      }
    case WRITE_STUDENT_INFO:
      return {
        ...state,
        [action.studentInfo[0]]: action.studentInfo[1]
      }
    case ADD_CAMPUS:
      return {
        ...state,
        campuses: [...state.campuses, action.campus]
      }
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.student]
    }
    case UPDATE_CAMPUS:
      return {
        ...state,
        campuses: state.campuses.map( campus => {
          if (campus.id === action.campus.id) return action.campus
          else return campus
        })
      }
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map( students => {
          if (student.id === action.student.id) return action.student
          else return student
        })
      }
    default:
      return state
  }
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware)))

export default store
