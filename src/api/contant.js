import $api from './api'

export function getlists () {
  const url = '/pro/getcontantlist'

  return $api.get(url)
}