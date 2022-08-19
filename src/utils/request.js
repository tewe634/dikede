import axios from 'axios'
import store from '@/store'
import router from '@/router'
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
      console.log(LogOutTimer())
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
  (error) => {
    return Promise.reject(error)
  }
)

export default service
