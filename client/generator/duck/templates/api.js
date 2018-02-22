import { List } from 'immutable'

import { fetch } from '../../utils'

const HOSTNAME = ''

export const fetchExample = () => {
  return fetch(`${HOSTNAME}/example`)
    .then((res) => res.json())
    .then((payload) => List(payload))
}
