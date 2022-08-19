import request from '@/utils/request'
// 获取图片
export function imgeCode(clientToken) {
  return request({ url: `api/user-service/user/imageCode/${clientToken}` })
}
// 登入
export function login(data) {
  return request({ url: 'api/user-service/user/login', method: 'POST', data })
}
// 获取用户基本信息
export const getUserInfo = (id) => request({ url: `/api/user-service/user/${id}` })
