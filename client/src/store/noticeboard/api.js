import { List } from 'immutable'
import { fetch } from '../../utils'


const HOSTNAME = process.env.API_HOSTNAME || 'http://localhost:4000'
const user = JSON.parse(localStorage.getItem('user'))
export const submitNotice = (data) => {  
 return fetch(`${HOSTNAME}/submitTender`, {
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
      message: 'Invalid !'
    }
    throw error
  })
}

export const activateActionPlan = (data) => {  
 return fetch(`${HOSTNAME}/api/v1/activeActionPlans/${data.id}`, {
    method: "PATCH",
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
      message: 'Invalid !'
    }
    throw error
  })
}

export const fetchNotices = () => {
  return fetch(`${HOSTNAME}/currentTender`, {
     method: 'GET'
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    console.log(payload, "payload")
    return payload
  }).catch((error) => {
    throw error
  })
}

export const updateActionPlan = (data) => {  
  return fetch(`${HOSTNAME}/api/v1/actionPlans/${data.id}`, {
    method: "PATCH",
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
      message: 'Invalid !'
    }
    throw error
  })
}

export const fetchByIdActionPlan = (id) => {
  return fetch(`${HOSTNAME}/api/v1/actionPlansId/${id}`, {
    method: 'GET'
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  }).catch((error) => {
    throw error
  })
}

export const fetchGrade = () => {
  return fetch(`${HOSTNAME}/api/v1/grade`, {
    method: 'GET'
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  }).catch((error) => {
    throw error
  })
}


export const deleteActionPlan = (id) => {
  return fetch(`${HOSTNAME}/api/v1/actionPlans/${id}`, { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    return { error }
  })
}