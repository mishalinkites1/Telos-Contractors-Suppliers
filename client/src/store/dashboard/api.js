import { List } from 'immutable'
import { fetch } from '../../utils'


const HOSTNAME = process.env.API_HOSTNAME

export const getDashboardData = (data) => {
  data = JSON.stringify(data)
  console.log(data, "data")
  return fetch(`${HOSTNAME}/api/v1/dashboard?filter=${data}`, {
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
