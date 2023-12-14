import { ApplicationType } from '@/enums/application'

export const SOURCE_ROUTE_PARENT = '/statistics/source'
export const SOURCE_ROUTE = [
  {
    path: SOURCE_ROUTE_PARENT + '/activeChannel',
    name: 'ViewAnalyticsActiveChannel',
    meta: {
      title: '活跃渠道',
      isDisabled: [ApplicationType.微信小程序, ApplicationType.支付宝小程序] 
    },
    component: () => import('@/views/analytics/source/active-channel/index.vue')
  },
  {
    path: SOURCE_ROUTE_PARENT + '/scene',
    name: 'ViewAnalyticsScene',
    meta: {
      title: '场景来源',
      isDisabled: [ApplicationType.iOS, ApplicationType.Web, ApplicationType.安卓] 
    },
    component: () => import('@/views/analytics/source/scene/index.vue')
  },
  {
    path: SOURCE_ROUTE_PARENT + '/installationChannel',
    name: 'ViewAnalyticsInstallationChannel',
    meta: {
      title: '安装渠道',
      isDisabled: [ApplicationType.微信小程序, ApplicationType.支付宝小程序] 
    },
    component: () => import('@/views/analytics/source/installation-channel/index.vue')
  }
]
