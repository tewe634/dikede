import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  beforeCreate() {
    Vue.prototype.$bus = this // 注册全局事件总线
  },
  router,
  store,
  render: h => h(App)
})
