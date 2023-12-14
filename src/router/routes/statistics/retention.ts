export const RETENTION_ROUTE_PARENT = '/statistics/retention'
export const RETENTION_ROUTE = [
  {
    path: '/statistics/retention/user',
    name: 'ViewAnalyticsRetentionUser',
    meta: {
      title: '用户留存'
    },
    component: () => import('@/views/analytics/retention/user/index.vue')
  },
  {
    path: '/statistics/retention/custom',
    name: 'ViewAnalyticsRetentionCustom',
    meta: {
      title: '自定义留存'
    },
    component: () => import('@/views/analytics/retention/custom/index.vue')
  }
]
