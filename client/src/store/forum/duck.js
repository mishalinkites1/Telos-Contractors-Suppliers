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



export const FETCH_FORUM = 'telos/FETCH_FORUM'
export const FETCH_FORUM_SUCCESS = 'telos/FETCH_FORUM_SUCCESS'
export const FETCH_FORUM_ERROR = 'telos/FETCH_FORUM_ERROR'

export const SAVE_FORUM = 'telos/SAVE_FORUM'
export const SAVE_FORUM_SUCCESS = 'telos/SAVE_FORUM_SUCCESS'
export const SAVE_FORUM_ERROR = 'telos/SAVE_FORUM_ERROR'

export const LIKE_POST = 'telos/LIKE_POST'
export const LIKE_POST_SUCCESS = 'telos/LIKE_POST_SUCCESS'
export const LIKE_POST_ERROR = 'telos/LIKE_POST_ERROR'

export const CLEAR_PHASE = 'telos/CLEAR_PHASE'

/***********************************
 * Initial State
 ***********/

const InitialStateInterface = {
  fetchPhase: INIT,
  likePostPhase: INIT,
  createPhase:INIT,
  forums: [],
  message:'',
  error: '',
  isSubmitting: ''
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
    
    
    
     case FETCH_FORUM: {
      return state
        .set('fetchPhase', LOADING)
        .set('likePostPhase', LOADING)
        .set('error', null)
        .set('createPhase', LOADING)
        .set('message', '')
        .set('isSubmitting', true)
    }
    
    case FETCH_FORUM_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('fetchPhase', SUCCESS)
        .set('error', null)
        .set('forums', payload.posts)
        .set('isSubmitting', false)
    } 

    case FETCH_FORUM_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('message', payload.error.message)
        .set('fetchPhase', ERROR)    
    }
    case SAVE_FORUM: {
      return state
        .set('fetchPhase', LOADING)
        .set('error', null)
        .set('createPhase', LOADING)
        .set('message', '')
        .set('isSubmitting', true)
    }
    
    case SAVE_FORUM_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('createPhase', SUCCESS)
         .set('message', payload.message)
        .set('error', null)
        .set('isSubmitting', false)
    } 

    case SAVE_FORUM_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('message', payload.error.message)
        .set('createPhase', ERROR)    
    }

    case LIKE_POST: {
      return state
        .set('fetchPhase', LOADING)
        .set('error', null)
        .set('likePostPhase', LOADING)
        .set('message', '')
        .set('isSubmitting', true)
    }
    
    case LIKE_POST_SUCCESS: {
      const { payload } = action
      console.log(payload, "payload")
      return state
        .set('likePostPhase', SUCCESS)
         .set('message', payload.message)
        .set('error', null)
        .set('isSubmitting', false)
    } 

    case LIKE_POST_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error.message)
        .set('message', payload.error.message)
        .set('likePostPhase', ERROR)    
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


export const fetchForum = (data) => {
  return {
    type: FETCH_FORUM,
  }
}

export const saveComment = (data) => {
  return {
    type: SAVE_FORUM,
    payload: data 
  }
}

export const likePost = (data) => {
  return {
    type: LIKE_POST,
    payload: data 
  }
}


export const clearPhase = () => ({
  type: CLEAR_PHASE
})

/***********************************
 * Epics
 ***********/


export const fetchForumEpic = (action$) =>
  action$
  .ofType(FETCH_FORUM)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.fetchForum(action.payload))
    .flatMap((payload) => ([{
      type: FETCH_FORUM_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: FETCH_FORUM_ERROR,
      payload: { error }
    }))
  })

export const saveCommentEpic = (action$) =>
  action$
  .ofType(SAVE_FORUM)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.saveComment(action.payload))
    .flatMap((payload) => ([{
      type: SAVE_FORUM_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: SAVE_FORUM_ERROR,
      payload: { error }
    }))
  })
  
export const likePostEpic = (action$) =>
  action$
  .ofType(LIKE_POST)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.likePost(action.payload))
    .flatMap((payload) => ([{
      type: LIKE_POST_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: LIKE_POST_ERROR,
      payload: { error }
    }))
  })

export const forumEpic = combineEpics(
  fetchForumEpic,
  saveCommentEpic,
  likePostEpic,
)
