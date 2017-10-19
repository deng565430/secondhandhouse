import $api from './api'

export function getprojectList () {
  const url = '/secondhand/getClientSource'

  return $api.get(url)
}

export function getfabuNum () {
  const url = '/secondhand/getClientSourceCount'

  return $api.get(url)
}
