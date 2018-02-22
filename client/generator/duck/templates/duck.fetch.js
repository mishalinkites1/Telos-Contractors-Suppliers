import Rx from 'rxjs/Rx'
import { Record, List } from 'immutable'
import { combineEpics } from 'redux-observable'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE'
export const FETCH_EXAMPLE_SUCCESS = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE_SUCCESS'
export const FETCH_EXAMPLE_ERROR = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE_ERROR'
export const FETCH_EXAMPLE_CANCELLED = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE_CANCELLED'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  phase: INIT,
  exampleThings: List(),
  error: null
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {

  switch (action.type) {

    case FETCH_EXAMPLE:
      return state
        .set('error', null)
        .set('phase', LOADING)

    case FETCH_EXAMPLE_SUCCESS:
      return state
        .set('exampleThings', action.payload.things)
        .set('error', null)
        .set('phase', SUCCESS)

    case FETCH_EXAMPLE_ERROR:
      return state
        .set('error', action.payload.error)
        .set('phase', ERROR)

    case FETCH_EXAMPLE_CANCELLED:
      return state
        .set('error', null)
        .set('phase', INIT)

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

export const fetchExample = () => ({
  type: FETCH_EXAMPLE
})

export const cancelFetchExample = () => ({
  type: FETCH_EXAMPLE_CANCELLED
})

/**
 * Private: Epics
 */

const fetchExampleEpic = (action$) =>
   action$
   .ofType(FETCH_EXAMPLE)
   .mergeMap((action) => {
     return Rx.Observable.fromPromise(api.fetchExample(action.payload))
     .map((things) => ({
       type: FETCH_EXAMPLE_SUCCESS,
       payload: things
     }))
     .catch((error) => Rx.Observable.of({
       type: FETCH_EXAMPLE_ERROR,
       payload: { error }
     }))
     .takeUntil(action$.ofType(FETCH_EXAMPLE_CANCELLED))
   })

/**
 * Public: Export Epics
 */

export const <%= duckName %>Epic = combineEpics(
  fetchExampleEpic
)
