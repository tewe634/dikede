import Layout from '@/layout'
export default {
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
}
