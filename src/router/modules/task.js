import Layout from '@/layout'
export default {
  path: '/task',
  component: Layout,
  redirect: '/task/business',
  meta: { title: '工单管理', icon: 'gongdan' },
  children: [{
    path: 'business',
    name: 'business',
    component: () => import('@/views/business'),
    meta: { title: '运营工单', isRepair: false }
  },
  {
    path: 'operation',
    name: 'operation',
    component: () => import('@/views/operation'),
    meta: { title: '运维工单', isRepair: true }
  }
  ]
}
