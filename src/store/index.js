import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import home from './modules/home'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    home
  },
  getters,
  plugins: [createPersistedState({
    reducer(state) {
      return {
        user: {
          hrsaasTime: state.user.hrsaasTime
        }
      }
    }
  })]
})

export default store
