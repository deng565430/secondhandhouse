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

export function getTypeList () {
  const url = '/pro/getwuye'

  return $api.get(url)
}

export function secondHandRoom (data) {
  const url = '/secondhand/addclientroom'

  return $api.post(url, data)
}

export function secondHandSource (data) {
  const url = '/secondhand/addclientsource'

  return $api.post(url, data)
}
