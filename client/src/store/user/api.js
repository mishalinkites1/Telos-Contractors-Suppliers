import { List } from 'immutable'
import Config from '../../config'
import { fetch } from '../../utils'
import UserModel from './user-model'
const HOSTNAME = process.env.API_HOSTNAME || 'http://localhost:4000'

export const loginUser = (credentials) => {
  console.log(credentials, "credentials")
  return fetch(`${HOSTNAME}/userlogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    throw error
  })
}

export const registerUser = (credentials) => {
  return fetch(`${HOSTNAME}/registerUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    throw error
  })
}

export const resetPassword = (credentials) => {
  return fetch(`${HOSTNAME}/api/v1/auth/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    throw error
  })
}

export const createUser = (data) => {
  return fetch(`${HOSTNAME}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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

export const fetchAdminUser = (page) => {
  return fetch(`${HOSTNAME}/api/v1/adminuser?page=${page}`)
  .then((res) => res.json())
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    return { error }
  })
}

export const deleteUser = (id) => {
  return fetch(`${HOSTNAME}/remove/${id}`, { method: 'DELETE' })
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

export const updateUser = (data) => {
  var id = data.id
  return fetch(`${HOSTNAME}/api/v1/adminuser/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((payload) => {
    if(payload.status === false) {
      return payload
    } else {
      return payload = { message: 'Profile Updated Successfully' }
    }
  }).catch((error) => {
   throw error
  })
}

export const refundUser = (data) => {
  return fetch(`${HOSTNAME}/api/v1/user/refund/${data.userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((payload) => {
      return payload
  }).catch((error) => {
   return error
  })
}

export const updateUserData = (data) => {
  var id = data.id
  return fetch(`${HOSTNAME}/api/v1/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((payload) => {
    if(payload.status === false) {
      return payload
    } else {
      return payload = { message: 'Profile Updated Successfully' }
    }
  }).catch((error) => {
   throw error
  })
}

export const fetchAppUser = (data) => {
  return fetch(`${HOSTNAME}/api/v1/user?term=${data.term}`)
  .then((res) => res.json())
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    return { error }
  })
}

export const getUserData = (data) => {
  return fetch(`${HOSTNAME}/api/v1/user/${data}`, {
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