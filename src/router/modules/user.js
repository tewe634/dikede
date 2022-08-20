import Layout from '@/layout'
export default {
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
}
