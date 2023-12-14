import { RouteLocationNormalized, Router } from 'vue-router'

const updateWindowTitle = (to: RouteLocationNormalized) => {
  const appName: string =
    typeof import.meta.env.VITE_APP_NAME === 'string' ? import.meta.env.VITE_APP_NAME : 'firebird admin'
  window.document.title =
    to.meta.documentTitle || to.meta.title ? `${to.meta.documentTitle || to.meta.title} - ${appName}` : appName
}

export const titleGuard = (router: Router) => {
  router.beforeEach((to: RouteLocationNormalized) => {
    updateWindowTitle(to)
  })
}
