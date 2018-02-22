import { List } from 'immutable'

import Config from '../../config'
import { fetch } from '../../utils'

const HOSTNAME =  "http://localhost:4000"
const user = JSON.parse(localStorage.getItem('user'))
export const fetchForum = (data) => {
   const body = {estateName: user.estateName}
  return fetch(`${HOSTNAME}/getForum`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    error = {
      message: ''
    }
    throw error
  })
}

export const saveComment = (data) => {
  return fetch(`${HOSTNAME}/newComment`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    error = {
      message: ''
    }
    throw error
  })
}

export const likePost = (data) => {
  return fetch(`${HOSTNAME}/likePost`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    error = {
      message: ''
    }
    throw error
  })
}