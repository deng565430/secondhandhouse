import $api from './api'

export function getProvincelist () {
  const url = '/pro/getProvincelist'

  return $api.get(url)
}

export function getDistirctlist (province, city) {
  const url = '/pro/getDistirctlist'

  const data = {
    province,
    city
  }

  return $api.post(url, data)
}

export function getCitylist (data) {
  const url = `/pro/getCitylist?city=${data}`

  return $api.post(url)
}
