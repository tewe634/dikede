import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        const res = await login(data)
        if (res.data.success) {
          commit('SETTOKEN', res.data.token)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {}
}
