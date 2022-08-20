import { getWorkAll } from '@/api/home'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getWorkAll({ commit }, params) {
      const res = await getWorkAll(params)
      console.log(res)
    }
  }
}
