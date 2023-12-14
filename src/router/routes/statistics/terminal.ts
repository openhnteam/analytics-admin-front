import { ApplicationType } from '@/enums/application'

export const TERMINAL_ROUTE_PARENT = '/statistics/terminal'
export const TERMINAL_ROUTE = [
  {
    path: TERMINAL_ROUTE_PARENT + '/device',
    name: 'ViewAnalyticsTerminalDevice',
    meta: {
      title: '设备',
      isDisabled: [ApplicationType.Web] 
    },
    component: () => import('@/views/analytics/terminal/device/index.vue')
  },
  {
    path: TERMINAL_ROUTE_PARENT + '/index.htmlresolution',
    name: 'ViewAnalyticsTerminalResolution',
    meta: {
      title: '分辨率'
    },
    component: () => import('@/views/analytics/terminal/resolution/index.vue')
  },
  {
    path: TERMINAL_ROUTE_PARENT + '/manufacturer',
    name: 'ViewAnalyticsTerminalManufacturer',
    meta: {
      title: '设备厂商',
      isDisabled: [ApplicationType.Web] 
    },
    component: () => import('@/views/analytics/terminal/manufacturer/index.vue')
  },
  {
    path: TERMINAL_ROUTE_PARENT + '/territory',
    name: 'ViewAnalyticsTerminalTerritory',
    meta: {
      title: '地域'
    },
    component: () => import('@/views/analytics/terminal/territory/index.vue')
  }
]
