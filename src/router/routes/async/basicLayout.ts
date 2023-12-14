import { RouteRecordRaw } from 'vue-router'
import { VIEW_HOME, VIEW_HOME_NAME } from '@/enums/view'
import { TERMINAL_ROUTE, TERMINAL_ROUTE_PARENT } from '../statistics/terminal'
import { USER_ANALYSIS_ROUTE, USER_ANALYSIS_ROUTE_PARENT } from '../statistics/userAnalysis'
import { SOURCE_ROUTE, SOURCE_ROUTE_PARENT } from '../statistics/source'
import { CUSTOM_EVENT, CUSTOM_EVENT_PARENT } from '../statistics/customEvent'
import { PARTICIPATION_ROUTE, PARTICIPATION_ROUTE_PARENT } from '../statistics/participation'
import { RETENTION_ROUTE, RETENTION_ROUTE_PARENT } from '../statistics/retention'
import { ApplicationType } from '@/enums/application'

export const BASIC_LAYOUT = () => import(/* displayName: BasicLayout */ '@/layouts/BasicLayout.vue')

export enum IconName {
  realTimeAnalysis = 'real-time-analysis', // 实时分析
  overview = 'overview', // 概览
  customEvent = 'customEvent', // 自定义事件
  customerSource = 'customerSource', // 获客来源
  userAnalysis = 'userAnalysis', // 用户分析
  engagementAnalysis = 'engagementAnalysis', // 参与度分析
  retentionAnalysis = 'retentionAnalysis', // 留存分析
  feature = 'feature', // 功能分析
  terminal = 'terminal', // 终端分析
  versionManagement = 'versionManagement' // 版本管理
}

const asyncLayoutRoute: RouteRecordRaw = {
  path: '/',
  name: 'basic-layout-root',
  redirect: VIEW_HOME,
  meta: { title: 'Root' },
  component: BASIC_LAYOUT,
  children: [
    {
      path: VIEW_HOME,
      name: VIEW_HOME_NAME,
      meta: { title: '首页' },
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/statistics',
      name: 'ViewStatistics',
      meta: { title: '统计' },
      component: () => import('@/views/statistics/index.vue'),
      redirect: '/statistics/overview/index',
      children: [
        {
          path: `/statistics/overview`,
          name: 'ViewAnalyticsOverviewIndex',
          meta: {
            iconName: IconName.overview,
            title: '概览',
            notIsLeaf: true // fix: 如果没有children的时候跳转不正确
          },
          redirect: '/statistics/overview/index',
          children: [
            {
              path: `/statistics/overview/index`,
              name: 'ViewAnalyticsOverviewIndex',
              meta: {
                title: '概览'
              },
              component: () => import('@/views/analytics/overview/index.vue')
            }
          ]
        },
        {
          path: CUSTOM_EVENT_PARENT,
          name: 'ViewAnalyticsCustomEvent',
          meta: {
            iconName: IconName.customEvent,
            title: '自定义事件'
          },
          children: CUSTOM_EVENT
        },
        {
          path: USER_ANALYSIS_ROUTE_PARENT,
          name: 'ViewAnalyticsUserAnalysis',
          meta: {
            iconName: IconName.userAnalysis,
            title: '用户分析'
          },
          children: USER_ANALYSIS_ROUTE
        },
        {
          path: PARTICIPATION_ROUTE_PARENT,
          name: 'ViewAnalyticsParticipation',
          meta: {
            iconName: IconName.engagementAnalysis,
            title: '参与度分析'
          },
          children: PARTICIPATION_ROUTE
        },
        {
          path: SOURCE_ROUTE_PARENT,
          name: 'ViewAnalyticsSource',
          meta: {
            iconName: IconName.customerSource,
            title: '获客来源',
            isDisabled: [ApplicationType.Web]
          },
          children: SOURCE_ROUTE
        },
        {
          path: TERMINAL_ROUTE_PARENT,
          name: 'ViewAnalyticsTerminal',
          meta: {
            iconName: IconName.terminal,
            title: '终端分析'
          },
          children: TERMINAL_ROUTE
        }
      ]
    },
    {
      path: '/application-set',
      name: 'ViewApplicationSet',
      meta: { title: '应用设置' },
      component: () => import('@/views/application-set/index.vue')
    }
  ]
}
export default asyncLayoutRoute
