import Layout from '@/layout'
export default {
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
}
