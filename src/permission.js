import router from './router'
import store from './store'
// 设置路由守卫控制跳转
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断有无token
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
