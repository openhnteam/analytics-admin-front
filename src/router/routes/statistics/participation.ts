export const PARTICIPATION_ROUTE_PARENT = '/statistics/participation'
export const PARTICIPATION_ROUTE = [
  {
    path: '/statistics/participation/path',
    name: 'ViewAnalyticsParticipationPath',
    meta: {
      title: '用户路径'
    },
    component: () => import('@/views/analytics/participation/path/index.vue')
  },
  {
    path: '/statistics/participation/duration',
    name: 'ViewAnalyticsParticipationDuration',
    meta: {
      title: '使用时长'
    },
    component: () => import('@/views/analytics/participation/duration/index.vue')
  }
]
