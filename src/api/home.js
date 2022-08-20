import request from '@/utils/request'
// 工单统计
export const getWorkAll = (params) => request({ url: '/api/order-service/report/orderCount', params })
