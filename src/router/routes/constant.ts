import { RouteRecordRaw } from 'vue-router'

import {
  VIEW_NOT_FOUND_NAME,
  VIEW_REDIRECT,
  VIEW_REDIRECT_NAME,
  VIEW_LOGIN_NAME,
  VIEW_LOGIN,
  VIEW_CREATE_ACCOUNT,
  VIEW_CREATE_ACCOUNT_NAME
} from '@/enums/view'

export const VIEW_REDIRECT_ROUTE: RouteRecordRaw = {
  path: VIEW_REDIRECT,
  name: VIEW_REDIRECT_NAME,
  meta: { hideInMenu: true },
  component: () => import('@/views/core/redirect.vue')
}

export const VIEW_LOGIN_ROUTE: RouteRecordRaw = {
  path: VIEW_LOGIN,
  name: VIEW_LOGIN_NAME,
  meta: { hideInMenu: true },
  component: () => import('@/views/login/index.vue')
}

export const VIEW_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: VIEW_NOT_FOUND_NAME,
  meta: { title: '404', hideInMenu: true },
  component: () => import('@/views/core/exception/404.vue')
}

export const VIEW_CREATE_ACCOUNT_ROUTE: RouteRecordRaw = {
  path: VIEW_CREATE_ACCOUNT,
  name: VIEW_CREATE_ACCOUNT_NAME,
  meta: {
    title: '创建账号',
    hideInMenu: true
  },
  component: () => import('@/views/login/account/index.vue')
}

export const constantRoutes: RouteRecordRaw[] = [
  VIEW_REDIRECT_ROUTE,
  VIEW_NOT_FOUND_ROUTE,
  VIEW_LOGIN_ROUTE,
  VIEW_CREATE_ACCOUNT_ROUTE
]
