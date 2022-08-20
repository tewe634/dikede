import request from '@/utils/request'
// 工单状态列表
export function taskStateList() {
  return request({ url: '/api/task-service/task/allTaskStatus', method: 'GET' })
}
// 工单列表
export function taskList(params) {
  return request({ url: '/api/task-service/task/search', method: 'GET', params })
}
