export const USER_ANALYSIS_ROUTE_PARENT = '/statistics/userAnalysis'
export const USER_ANALYSIS_ROUTE = [
  {
    path: USER_ANALYSIS_ROUTE_PARENT + '/user',
    name: 'ViewAnalyticsUserAnalysisUser',
    meta: {
      title: '用户统计'
    },
    component: () => import('@/views/analytics/user/user-statistics/inde.vue')
  },
  {
    path: USER_ANALYSIS_ROUTE_PARENT + '/startsNum',
    name: 'ViewAnalyticsUserAnalysisStartsNum',
    meta: {
      title: '启动次数'
    },
    component: () => import('@/views/analytics/user/starts-number/index.vue')
  }
]
