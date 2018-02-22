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
 **********/


export const FETCH_NOTICE  = 'pointer/detail/FETCH_NOTICE '
export const FETCH_NOTICE_SUCCESS = 'pointer/detail/FETCH_NOTICE_SUCCESS'
export const FETCH_NOTICE_ERROR = 'pointer/detail/FETCH_NOTICE_ERROR'

export const SUBMIT_NOTICE  = 'pointer/detail/SUBMIT_NOTICE '
export const SUBMIT_NOTICE_SUCCESS = 'pointer/detail/SUBMIT_NOTICE_SUCCESS'
export const SUBMIT_NOTICE_ERROR = 'pointer/detail/SUBMIT_NOTICE_ERROR'

export const CLEAR_PHASE = 'pointer/detail/CLEAR_PHASE'
/***********************************
 * Initial State
 ***********/

const InitialStateInterface = {
  token: localStorage.getItem('user'),
  fetchPhase: INIT,
  submitPhase: INIT,
  deletePhase: INIT,
  gradePhase: INIT,
  fetchPhase: INIT,
  activePlanPhase: INIT,
  error: null,
  message: '',
  isSubmitting: false,
  notices: '',
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
 
export default function (state = new InitialState(), action = {}) {

  switch (action.type) {
    
    

    case FETCH_NOTICE: {
      return state
        .set('submitPhase', INIT)
        .set('deletePhase', INIT)
        .set('fetchPhase', LOADING)
        .set('error', null)
        .set('message', '')
        .set('isSubmitting', true)
    }
    
    case FETCH_NOTICE_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('notices', payload.tenders)
        .set('fetchPhase', SUCCESS)
        .set('error', null)
        .set('message', payload.message)
        .set('isSubmitting', false)
    } 

    case FETCH_NOTICE_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('fetchPhase', ERROR)
        .set('message', payload.error.message)
    }
    case SUBMIT_NOTICE: {
      return state
        .set('submitPhase', INIT)
        .set('deletePhase', INIT)
        .set('fetchPhase', LOADING)
        .set('error', null)
        .set('message', '')
        .set('isSubmitting', true)
    }
    
    case SUBMIT_NOTICE_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('submitPhase', SUCCESS)
        .set('fetchPhase', INIT)
        .set('error', null)
        .set('message', payload.message)
        .set('isSubmitting', false)
    } 

    case SUBMIT_NOTICE_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('submitPhase', ERROR)
        .set('message', payload.error.message)
    }
    
    case CLEAR_PHASE: {
      return state
        .set('fetchPhase', INIT)
    }
    default: {
      return state
    }
  }
}

/***********************************
 * Action Creators
 ***********/



export const fetchNotices = (data) => {
  return {
    type: FETCH_NOTICE,
    payload: data
  }
}

export const submitNotice = (data) => {
  return {
    type: SUBMIT_NOTICE,
    payload: data
  }
}

export const clearPhase = () => {
  return {
    type: CLEAR_PHASE
  }
}
/***********************************
 * Epics
 ***********/



export const fetchNoticesEpic = (action$) =>
  action$
  .ofType(FETCH_NOTICE)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.fetchNotices(action.payload))
    .flatMap((payload) => ([{
      type: FETCH_NOTICE_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: FETCH_NOTICE_ERROR,
      payload: { error }
    }))
  })  

 
export const submitNoticeEpic = (action$) =>
  action$
  .ofType(SUBMIT_NOTICE)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.submitNotice(action.payload))
    .flatMap((payload) => ([{
      type: SUBMIT_NOTICE_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: SUBMIT_NOTICE_ERROR,
      payload: { error }
    }))
  })  
export const noticeBoardEpic = combineEpics(
  fetchNoticesEpic,
  submitNoticeEpic

)