import $api from './api'

export function secondhHand (data) {
  const url = '/secondhand/gethome'

  return $api.post(url, data)
}
