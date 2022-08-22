import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const logOut = 3600 // 超时的时间一个小时
function LogOutTimer() { // 设置一个函数判断token是否超时
  return (Date.now() - store.getters.hrsaasTime) / 1000 > logOut
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  async(config) => {
    if (store.getters.token) { // 如果有token就放在请求头上
      if (LogOutTimer()) { // 调用函数，token超时会返回true触发判断
        await store.commit('user/LOGOUT')
        router.push('/login')
        return Promise.reject(new Error('token超时'))
      }
      config.headers.Authorization = store.getters.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response
  },
  async(error) => {
    // 被从处理token超时，通过后端返回的信息来判断
    if (error.response?.data === 'token校验失败') {
      await store.commit('user/LOGOUT')
      router.push('/login')
      Message.error('token超时')
    }
    return Promise.reject(error)
  }
)

export default service
