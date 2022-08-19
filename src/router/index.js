import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

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
  {
    path: '/task',
    component: Layout,
    redirect: '/task/business',
    meta: { title: '工单管理', icon: 'gongdan' },
    children: [{
      path: 'business',
      name: 'business',
      component: () => import('@/views/business'),
      meta: { title: '运营工单' }
    },
    {
      path: 'operation',
      name: 'operation',
      component: () => import('@/views/operation'),
      meta: { title: '运维工单' }
    }
    ]
  },
  {
    path: '/node',
    component: Layout,
    redirect: '/node/region',
    meta: { title: '点位管理', icon: 'dianwei' },
    children: [
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/region'),
        meta: { title: '区域管理' }
      },
      {
        path: 'node',
        name: 'node',
        component: () => import('@/views/node'),
        meta: { title: '点位管理' }
      },
      {
        path: 'partner',
        name: 'partner',
        component: () => import('@/views/partner'),
        meta: { title: '合作商管理' }
      }
    ]
  },
  {
    path: '/vm',
    component: Layout,
    redirect: '/vm/index',
    meta: { title: '设备管理', icon: 'shebei' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/vmIndex'),
        meta: { title: '设备管理' }
      },
      {
        path: 'status',
        name: 'status',
        component: () => import('@/views/status'),
        meta: { title: '设备状态' }
      },
      {
        path: 'type',
        name: 'type',
        component: () => import('@/views/type'),
        meta: { title: '设备类型管理' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '人员管理', icon: 'renyuan' },
    children: [
      {
        path: 'index',
        name: 'userIndex',
        component: () => import('@/views/userIndex'),
        meta: { title: '人员列表' }
      },
      {
        path: 'user-task-stats',
        component: () => import('@/views/userTask'),
        meta: { title: '人效统计' }
      },
      {
        path: 'user-work',
        name: 'user-work',
        component: () => import('@/views/userWork'),
        meta: { title: '工作量列表' }
      }
    ]
  },
  {
    path: '/sku',
    component: Layout,
    redirect: '/sku/sku-class',
    meta: { title: '商品管理', icon: 'shangping' },
    children: [
      {
        path: 'sku-class',
        name: 'sku-class',
        component: () => import('@/views/skuClass'),
        meta: { title: '商品类型' }
      },
      {
        path: 'sku',
        name: 'sku',
        component: () => import('@/views/sku'),
        meta: { title: '商品管理' }
      }
    ]
  },
  {
    path: '/policy',
    component: Layout,
    redirect: '/policy/index',
    children: [{
      path: 'index',
      name: 'policy',
      component: () => import('@/views/policy'),
      meta: { title: '策略管理', icon: 'celue' }
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    children: [{
      path: 'index',
      name: 'order',
      component: () => import('@/views/order'),
      meta: { title: '订单管理', icon: 'home' }
    }]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/index',
    children: [{
      path: 'index',
      name: 'report',
      component: () => import('@/views/report'),
      meta: { title: '对账系统', icon: 'duizhang' }
    }]
  },

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
