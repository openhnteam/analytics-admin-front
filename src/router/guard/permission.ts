import { RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'
import { usePermissionStoreOut } from '@/store/module/permission'
import { useUserStoreOut } from '@/store/module/user'
import { VIEW_NOT_FOUND_NAME } from '@/enums/view'
import { addRoutes } from '@/router'
import { VIEW_NOT_FOUND_ROUTE } from '@/router/routes/constant'

export const permissionGuard = (router: Router) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const permissionStore = usePermissionStoreOut()
    const memberStore = useUserStoreOut()

    if (to.query.accessToken) {
      memberStore.setToken(to.query.accessToken as string)
      delete to.query.accessToken
    }
    if (permissionStore.getIsRoutesGenerated) {
      next()
      return
    }
    const filteredAsyncRoutes = permissionStore.generateAsyncRoutes()
    addRoutes([VIEW_NOT_FOUND_ROUTE, ...filteredAsyncRoutes])
    if (to.name === VIEW_NOT_FOUND_NAME) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
