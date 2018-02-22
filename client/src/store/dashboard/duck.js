import Rx from 'rxjs/Rx'
import { Record, List} from 'immutable'
import { combineEpics } from 'redux-observable'
import HttpStatus from 'http-status-codes'
import { assign } from 'lodash'
import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/**
 * Public: Action Types
 */

export const GET_DASHBOARD_DATA = 'pointer/user/GET_DASHBOARD_DATA'
export const GET_DASHBOARD_DATA_SUCCESS = 'pointer/user/GET_DASHBOARD_DATA_SUCCESS'
export const GET_DASHBOARD_DATA_ERROR = 'pointer/user/GET_DASHBOARD_DATA_ERROR'

export const CLEAR_USER_ERROR = 'pointer/user/CLEAR_USER_ERROR'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  phase: INIT,
  dataPhase: INIT,
  error: null,
  venues:[],
  dashboardData: [],
  isSubmitting: false ,
  searchTextEverywhere:'',
  name:'',
  city:'',
  state:'',
  message:'',
  zipcode:'',
  venueUtc:'',
  venuesMessage: null,
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {

  switch (action.type) {

    case GET_DASHBOARD_DATA: {
      return state
        .set('dataPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case GET_DASHBOARD_DATA_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('dataPhase', SUCCESS)
        .set('dashboardData', payload)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case GET_DASHBOARD_DATA_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('dataPhase', ERROR)
    }
    
    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */


export const getDashboardData = (data) => ({
  type: GET_DASHBOARD_DATA,
    payload: data
})


export const clearUserError = () => ({
  type: CLEAR_USER_ERROR
})




/**
 * Private: Epics
 */

const getDashboardDataEpic = (action$) =>
  action$
  .ofType(GET_DASHBOARD_DATA)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.getDashboardData(action.payload))
    .flatMap((payload) => ([{
      type: GET_DASHBOARD_DATA_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: GET_DASHBOARD_DATA_ERROR,
      payload: { error }
    }))
  })


/**
 * Public: Export Epics
 */

export const dashboardEpic = combineEpics(
  getDashboardDataEpic
)
