import Rx from 'rxjs/Rx'
import { Record } from 'immutable'
import { combineEpics } from 'redux-observable'
import HttpStatus from 'http-status-codes'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'
import Config from '../../config'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const LOGIN_USER = 'pointer/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'pointer/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'pointer/user/LOGIN_USER_ERROR'

export const REGISTER_USER = 'pointer/user/REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'pointer/user/REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'pointer/user/REGISTER_USER_ERROR'

export const RESET_PASSWORD = 'pointer/user/RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'pointer/user/RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'pointer/user/RESET_PASSWORD_ERROR'

export const CREATE_ADMIN_USER = 'pointer/user/CREATE_ADMIN_USER'
export const CREATE_ADMIN_USER_SUCCESS = 'pointer/user/CREATE_ADMIN_USER_SUCCESS'
export const CREATE_ADMIN_USER_ERROR = 'pointer/user/CREATE_ADMIN_USER_ERROR'

export const REFUND_USER = 'pointer/user/REFUND_USER'
export const REFUND_USER_SUCCESS = 'pointer/user/REFUND_USER_SUCCESS'
export const REFUND_USER_ERROR = 'pointer/user/REFUND_USER_ERROR'

export const FETCH_ADMIN_USER = 'pointer/user/FETCH_ADMIN_USER'
export const FETCH_ADMIN_USER_SUCCESS = 'pointer/user/FETCH_ADMIN_USER_SUCCESS'
export const FETCH_ADMIN_USER_ERROR = 'pointer/user/FETCH_ADMIN_USER_ERROR'

export const UPDATE_USER = 'pointer/user/UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'pointer/user/UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'pointer/user/UPDATE_USER_ERROR'

export const UPDATE_USER_DATA = 'pointer/user/UPDATE_USER'
export const UPDATE_USER_DATA_SUCCESS = 'pointer/user/UPDATE_USER_DATA_SUCCESS'
export const UPDATE_USER_DATA_ERROR = 'pointer/user/UPDATE_USER_DATA_ERROR'

export const DELETE_USER = 'pointer/user/DELETE_USER'
export const DELETE_USER_SUCCESS = 'pointer/user/DELETE_USER_SUCCESS'
export const DELETE_USER_ERROR = 'pointer/user/DELETE_USER_ERROR'

export const FETCH_APP_USER = 'pointer/user/FETCH_APP_USER'
export const FETCH_APP_USER_SUCCESS = 'pointer/user/FETCH_APP_USER_SUCCESS'
export const FETCH_APP_USER_ERROR = 'pointer/user/FETCH_APP_USER_ERROR'

export const GET_USER_DATA = 'pointer/user/GET_USER_DATA'
export const GET_USER_DATA_SUCCESS = 'pointer/user/GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_ERROR = 'pointer/user/GET_USER_DATA_ERROR'

export const SIGN_OUT = 'pointer/user/SIGN_OUT'
export const SIGN_OUT_SUCCESS = 'pointer/user/SIGN_OUT_SUCCESS'

export const CLEAR_PHASE = 'pointer/user/CLEAR_PHASE'

/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  token: null,  // We need this here to tell InitialState that there is a token key,
                // but it will be reset below to what is in localStorage, unless a value
                // is passed in when the object is instanciated
  phase: INIT,
  patchPhase: INIT,
  adminPhase: INIT,
  deletePhase: INIT,
  resetPhase: INIT,
  fetchPhase: INIT,
  refundPhase: INIT,
  registerPhase: INIT,
  resetPasswordPhase: INIT,
  updatePhase: INIT,
  user: null,
  users: [],
  userdata:[],
  dataPhase: INIT,
  error: null,
  isSubmitting: false,
  edit: null,
  settings: null,
  message:'',
  success:'',
  registerData: null,
  resetPasswordError: null,
  adminCount: 0,
  adminLimit: 0
}
class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = localStorage.getItem(Config.LocalStorageKeys.Authorization)
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements
export default function (state = new InitialState(), action = {}) {

  switch (action.type) {
    case LOGIN_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      window.localStorage.setItem(Config.LocalStorageKeys.Authorization, payload.token)
      window.localStorage.setItem("user", JSON.stringify(payload.user))
      return state
        .set('phase', SUCCESS)
        .set('user', payload.user)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', ERROR)
        .set('isSubmitting', false)
    }

    case REGISTER_USER: {
      return state
        .set('registerPhase', LOADING)
        .set('registerData', null)
        .set('isSubmitting', true)
    }

    case REGISTER_USER_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('registerPhase', SUCCESS)
        .set('registerData', payload.message)
        .set('isSubmitting', false)
    }

    case REGISTER_USER_ERROR: {
      const { payload } = action
      return state
        .set('registerPhase', ERROR)
        .set('registerData', payload.message)
        .set('isSubmitting', false)
    }
    case RESET_PASSWORD: {
      return state
        .set('resetPasswordPhase', LOADING)
        .set('resetPasswordError', null)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case RESET_PASSWORD_SUCCESS: {
      const { payload } = action
      return state
        .set('resetPasswordPhase', SUCCESS)
        .set('resetPasswordError', null)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case RESET_PASSWORD_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
         .set('message', payload.error.message)
        .set('resetPasswordError', payload.error.message)
        .set('resetPasswordPhase', ERROR)
        .set('isSubmitting', false)
    }
    case CREATE_ADMIN_USER: {
      return state
        .set('adminPhase', LOADING)
        .set('error', null)
        .set('message', '')
        .set('isSubmitting', true)
    }

    case CREATE_ADMIN_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('adminPhase', SUCCESS)
        .set('error', null)
        .set('success', payload.success)
        .set('message', payload.message)
        .set('isSubmitting', false)
    }

    case CREATE_ADMIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('message', payload.error.message)
        .set('adminPhase', ERROR)
    }
    case REFUND_USER: {
      return state
        .set('refundPhase', LOADING)
        .set('error', null)
        .set('message', '')
        .set('isSubmitting', true)
    }

    case REFUND_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('refundPhase', SUCCESS)
        .set('error', null)
        .set('message', payload.message)
        .set('isSubmitting', false)
    }

    case REFUND_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('message', payload.error.message)
        .set('refundPhase', ERROR)
    }
    case FETCH_ADMIN_USER: {
      return state
        .set('fetchPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case FETCH_ADMIN_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('users', payload.users)
        .set('adminCount', payload.count)
        .set('adminLimit', payload.limit)
        .set('fetchPhase', SUCCESS)
        .set('adminPhase', INIT)
        .set('deletePhase', INIT)
        .set('dataPhase', INIT)
        .set('error', null)        
    }

    case FETCH_ADMIN_USER_ERROR: {
      const { error } = action.payload
      return state
        .set('error', error)
        .set('fetchPhase', ERROR)
    }

    case UPDATE_USER: {
      return state
        .set('adminPhase', LOADING)
        .set('error', null)
        .set('message', '')
        .set('isSubmitting', true)
    }

    case UPDATE_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('adminPhase', SUCCESS)
        .set('error', null)
        .set('message', payload.message)
        .set('isSubmitting', false)
    }

    case UPDATE_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('message', payload.error.message)
        .set('adminPhase', ERROR)
    }
    case UPDATE_USER_DATA: {
      return state
        .set('updatePhase', LOADING)
        .set('error', null)
        .set('message', '')
        .set('isSubmitting', true)
    }

    case UPDATE_USER_DATA_SUCCESS: {
      const { payload } = action
      return state
        .set('updatePhase', SUCCESS)
        .set('error', null)
        .set('message', payload.message)
        .set('isSubmitting', false)
    }

    case UPDATE_USER_DATA_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('message', payload.error.message)
        .set('updatePhase', ERROR)
    }
    case GET_USER_DATA: {
      return state
        .set('dataPhase', LOADING)
        .set('updatePhase', INIT)
    .set('error', null)
        .set('isSubmitting', true)
    }

    case GET_USER_DATA_SUCCESS: {
      const { payload } = action
      return state
        .set('dataPhase', SUCCESS)
        .set('userdata', payload.user)
      .set('error', null)
      .set('isSubmitting', false)
    }

    case GET_USER_DATA_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('dataPhase', ERROR)
    }

    case DELETE_USER: {
      const { payload } = action
      return state
        .set('user', payload)
        .set('deletePhase', INIT)
        .set('message', '')
        .set('error', null)
        .set('isSubmitting', false)
    }

    case DELETE_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('user', payload)
        .set('deletePhase', SUCCESS)
        .set('message', payload.message)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case DELETE_USER_ERROR: {
      const { error } = action.payload
      return state
        .set('error', error)
        .set('deletePhase', ERROR)
        .set('message', payload.error.message)
    }

    case FETCH_APP_USER: {
      return state
        .set('fetchPhase', LOADING)
        .set('error', null)
        .set('users', null)
        .set('isSubmitting', true)
    }

    case FETCH_APP_USER_SUCCESS: {
      const { payload } = action
      return state
        .set('users', payload)
        .set('fetchPhase', SUCCESS)
        .set('adminPhase', INIT)
        .set('error', null)        
    }

    case FETCH_APP_USER_ERROR: {
      const { error } = action.payload
      return state
        .set('error', error)
        .set('fetchPhase', ERROR)
    }

    case SIGN_OUT: {
      localStorage.clear();
      localStorage.removeItem("user")
      return new InitialState()
    }

     case CLEAR_PHASE: {
     return state
        .set('dataPhase', INIT)
    }

    default: {
      return state
    }
  }
}


/***********************************
 * Action Creators
 ***********/

export const loginUser = (credentials) => {
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const registerUser = (credentials) => {
  return {
    type: REGISTER_USER,
    payload: credentials
  }
}

export const resetPassword = (credentials) => {
  return {
    type: RESET_PASSWORD,
    payload: credentials
  }
}

export const createAdminUser = (data) => ({
  type: CREATE_ADMIN_USER,
  payload: { data }
})

export const fetchAdminUser = (page) => ({
  type: FETCH_ADMIN_USER,
  payload: page
})

export const getUserData = (data) => ({
  type: GET_USER_DATA,
  payload:  data 
})


export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id
})

export const updateUser = (data) => ({
  type: UPDATE_USER,
  payload: { data }
})

export const refundUser = (data) => ({
  type: REFUND_USER,
  payload: { data }
})

export const updateUserData = (data) => ({
  type: UPDATE_USER_DATA,
  payload: { data }
})
export const fetchAppUser = (data) => ({
  type: FETCH_APP_USER,
  payload: data
})

export const handleSignOut = () => ({
  type: SIGN_OUT
})

export const clearPhase = () => ({
  type: CLEAR_PHASE
})


/***********************************
 * Epics
 ***********************************/
const loginUserEpic = (action$) =>
  action$
  .ofType(LOGIN_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.loginUser(action.payload))
    .flatMap((payload) => ([{
      type: LOGIN_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: LOGIN_USER_ERROR,
      payload: { error }
    }))    
  })

const registerUserEpic = (action$) =>
  action$
  .ofType(REGISTER_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.registerUser(action.payload))
    .flatMap((payload) => ([{
      type: REGISTER_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: REGISTER_USER_ERROR,
      payload: { error }
    }))    
  })

const resetPasswordEpic = (action$) =>
  action$
  .ofType(RESET_PASSWORD)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.resetPassword(action.payload))
    .flatMap((payload) => ([{
      type: RESET_PASSWORD_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: RESET_PASSWORD_ERROR,
      payload: { error }
    }))    
  })

const createAdminUserEpic = (action$) =>
  action$
  .ofType(CREATE_ADMIN_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.createUser(action.payload.data))
    .flatMap((payload) => ([{
      type: CREATE_ADMIN_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: CREATE_ADMIN_USER_ERROR,
      payload: { error }
    }))
  })

const fetchAdminUserEpic = (action$) =>
  action$
  .ofType(FETCH_ADMIN_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.fetchAdminUser(action.payload))
    .map((payload) => ({
      type: FETCH_ADMIN_USER_SUCCESS,
      payload
    }))
    .catch((error) => Rx.Observable.of({
      type: FETCH_ADMIN_USER_ERROR,
      payload: { error }
    }))
  })

const deleteUserEpic = (action$) =>
  action$
  .ofType(DELETE_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.deleteUser(action.payload))
    .map((payload) => ({
      type: DELETE_USER_SUCCESS,
      payload
    }))
    .catch((error) => Rx.Observable.of({
      type: DELETE_USER_ERROR,
      payload: { error }
    }))
  })

const updateUserEpic = (action$) =>
  action$
  .ofType(UPDATE_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.updateUser(action.payload.data))
    .flatMap((admin) => ([{
      type: UPDATE_USER_SUCCESS,
      payload: admin
    }]))
    .catch((error) => Rx.Observable.of({
      type: UPDATE_USER_ERROR,
      payload: { error }
    }))    
  })

const refundUserEpic = (action$) =>
  action$
  .ofType(REFUND_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.refundUser(action.payload.data))
    .flatMap((admin) => ([{
      type: REFUND_USER_SUCCESS,
      payload: admin
    }]))
    .catch((error) => Rx.Observable.of({
      type: REFUND_USER_ERROR,
      payload: { error }
    }))    
  })

const updateUserDataEpic = (action$) =>
  action$
  .ofType(UPDATE_USER_DATA)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.updateUserData(action.payload.data))
    .flatMap((admin) => ([{
      type: UPDATE_USER_DATA_SUCCESS,
      payload: admin
    }]))
    .catch((error) => Rx.Observable.of({
      type: UPDATE_USER_DATA_ERROR,
      payload: { error }
    }))    
  })

const fetchAppUserEpic = (action$) =>
  action$
  .ofType(FETCH_APP_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.fetchAppUser(action.payload))
    .map((payload) => ({
      type: FETCH_APP_USER_SUCCESS,
      payload
    }))
    .catch((error) => Rx.Observable.of({
      type: FETCH_APP_USER_ERROR,
      payload: { error }
    }))
  })

const getUserDataEpic = (action$) =>
  action$
  .ofType(GET_USER_DATA)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.getUserData(action.payload))
    .flatMap((payload) => ([{
      type: GET_USER_DATA_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: GET_USER_DATA_ERROR,
      payload: { error }
    }))
  })
export const userEpic = combineEpics(
  loginUserEpic,
  registerUserEpic
)
