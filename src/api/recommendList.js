import $api from './api'

export function secondhHand (data) {
  const url = '/secondhand/gethome'

  return $api.post(url, data)
}

export function addClientResponse (data) {
  const url = '/secondhand/addclientresponse'

  return $api.post(url, data)
}
