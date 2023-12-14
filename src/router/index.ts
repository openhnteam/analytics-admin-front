import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from './routes/constant'
import { titleGuard } from './guard/title'
import { progressGuard } from './guard/progress'
import { permissionGuard } from './guard/permission'
import { applicationGuard } from './guard/application'

const guardList = [titleGuard, progressGuard, permissionGuard, applicationGuard]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0, left: 0 })
})

guardList.forEach((guard) => guard(router))

// @ts-ignore
let removeRouteList = []

export function addRoutes(filteredAsyncRoutes: RouteRecordRaw[]) {
  removeRouteList = []
  filteredAsyncRoutes.forEach((r: RouteRecordRaw) => {
    removeRouteList.push(router.addRoute(r))
  })
}

export function resetRoutes() {
  // @ts-ignore
  removeRouteList.forEach((removeRoute) => removeRoute())
}
