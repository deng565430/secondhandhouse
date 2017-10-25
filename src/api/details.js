import $api from './api'

// 获取列表详情
export function getDetails (data) {
  const url = '/secondhand/getdetails'

  return $api.post(url, data)
}

// 加入黑名单
export function addBlackList (data) {
  const url = '/secondhand/addblacklist'

  return $api.formData(url, data)
}

// 获取联系详情
export function getDetailsNews (data) {
  const url = '/secondhand/getdetailsnews'

  return $api.post(url, data)
}

// 我有客源/房源
export function addClientResponse (data) {
  const url = '/secondhand/addclientresponse'

  return $api.post(url, data)
}

// 回复消息
export function replyClientResponse (data) {
  const url = '/secondhand/replyclientresponse'

  return $api.post(url, data)
}

// 拒绝响应
export function refuseClientResponse (data) {
  const url = '/secondhand/refuseclientresponse'

  return $api.post(url, data)
}

// 停止项目
export function updateClientSourceStatus (data) {
  const url = `/secondhand/updateClientSourceStatus?id=${data.id}&status=${data.status}&operate=${data.operate}`

  return $api.post(url)
}