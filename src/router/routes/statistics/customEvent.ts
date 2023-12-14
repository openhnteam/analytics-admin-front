export const CUSTOM_EVENT_PARENT = '/statistics/customEvent'
export const CUSTOM_EVENT = [
  {
    path: CUSTOM_EVENT_PARENT + '/overview',
    name: 'ViewAnalyticsEventOverview',
    meta: {
      title: '事件概览'
    },
    component: () => import('@/views/event/overview/index.vue')
  },
  {
    path: CUSTOM_EVENT_PARENT + '/detail',
    name: 'ViewAnalyticsEventDetail',
    meta: {
      title: '事件明细'
    },
    component: () => import('@/views/event/detail/index.vue')
  }
]
