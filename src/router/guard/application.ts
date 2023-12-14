import { Router } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { useApplicationStoreOut } from '@/store/module/application'
import { VIEW_LOGIN, VIEW_HOME_NAME } from '@/enums/view'
import { whitePathList } from '@/enums/route-white-list'

const IGNORE_LIST = [...whitePathList, VIEW_LOGIN]

export const applicationGuard = (router: Router) => {
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.path !== from.path && !IGNORE_LIST.includes(to.path)) {
      const applicationStore = useApplicationStoreOut()
      if (applicationStore.applicationList.length === 0 || to.name === VIEW_HOME_NAME) {
        applicationStore.setApplicationList([])
        applicationStore.getAllApplicationList()
      }
    }
  })
}
