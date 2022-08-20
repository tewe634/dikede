import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userId: JSON.parse(localStorage.getItem('userId')) || '',
    userName: '',
    hrsaasTime: ''
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    USERID(state, id) {
      state.userId = id
      localStorage.setItem('userId', JSON.stringify(id))
    },
    SETUSERINFO(state, userName) {
      state.userName = userName
    },
    // 退出
    LOGOUT(state) {
      removeToken()
      localStorage.removeItem('userId')
      state.token = ''
      state.userId = ''
    },
    SETTIME(state, time) {
      state.hrsaasTime = time
    }
  },
  actions: {
  // 登入
    async login({ commit }, data) {
      try {
        const res = await login(data)
        const msg = res.data.msg
        if (msg === '验证码错误') {
          Message({
            message: msg,
            type: 'error'
          })
        }
        if (res.data.success) {
          commit('SETTOKEN', res.data.token)
          commit('USERID', res.data.userId)
          commit('SETTIME', Date.now())
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取个人信息
    async setUserInfo({ commit }, id) {
      try {
        const res = await getUserInfo(id)
        if (res.data.status) {
          commit('SETUSERINFO', res.data.userName)
        }
      } catch (error) {
        Message.error(error.message)
        console.log(error)
      }
    }
  }
}
