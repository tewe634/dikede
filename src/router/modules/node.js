import Layout from '@/layout'
export default {
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
}
