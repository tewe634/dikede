import Layout from '@/layout'
export default {
  path: '/report',
  component: Layout,
  redirect: '/report/index',
  children: [{
    path: 'index',
    name: 'report',
    component: () => import('@/views/report'),
    meta: { title: '对账系统', icon: 'duizhang' }
  }]
}
