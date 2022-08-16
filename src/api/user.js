import request from '@/utils/request'

export function imgeCode(clientToken) {
  return request({ url: `api/user-service/user/imageCode/${clientToken}` })
}
export function login(data) {
  return request({ url: 'api/user-service/user/login', method: 'POST', data })
}
