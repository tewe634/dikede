import Vue from 'vue'
import Router from 'vue-router'
import task from './modules/task'
import node from './modules/node'
import vm from './modules/vm'
import user from './modules/user'
import sku from './modules/sku'
import policy from './modules/policy'
import order from './modules/order'
import report from './modules/report'
Vue.use(Router)
const asyncRouter = [task, node, vm, user, sku, policy, order, report]
/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home'),
      meta: { title: '帝可得', icon: 'house' }
    }]
  },
  ...asyncRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
