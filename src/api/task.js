import request from '@/utils/request'
// 工单状态列表
export function taskStateList() {
  return request({ url: '/api/task-service/task/allTaskStatus', method: 'GET' })
}
// 工单列表
export function taskList(params) {
  return request({ url: '/api/task-service/task/search', method: 'GET', params })
}
// 获取工单详情
export function getTaskState(taskId) {
  return request({ url: `/api/task-service/task/taskInfo/${taskId}`, method: 'GET' })
}
// 补货详情
export function backOrderTask(taskId) {
  return request({ url: `/api/task-service/taskDetails/${taskId}`, method: 'GET' })
}

// 获取补货预警值
export function getdeployVal() {
  return request({ url: '/api/task-service/task/supplyAlertValue', method: 'GET' })
}
// 设置自动补货工单阈值
export function getAutoTask(data) {
  return request({ url: '/api/task-service/task/autoSupplyConfig', method: 'POST', data })
}
// 取消工单
export function getCencalTask(taskId, data) {
  return request({ url: `/api/task-service/task/cancel/${taskId}`, method: 'POST', data })
}
// 根据售货机获取运营人员列表
export function getPeopleList(innerCode) {
  return request({ url: `/api/user-service/user/operatorList/${innerCode}`, method: 'GET' })
}
// 获取售货机货道详情
export function getVendingDetail(innerCode) {
  return request({ url: `/api/vm-service/channel/channelList/${innerCode}`, method: 'GET' })
}
// 创建工单
export function getFoundTask(data) {
  return request({ url: '/api/task-service/task/create', method: 'POST', data })
}
// 根据售货机获取维修人员列表
export function getVendingTask(innerCode) {
  return request({ url: `/api/user-service/user/repairerList/${innerCode}`, method: 'GET' })
}
// 获取所有工单类型
export function getAllTask() {
  return request({ url: '/api/task-service/taskType/list', method: 'GET' })
}
