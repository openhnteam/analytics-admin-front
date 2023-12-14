import { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { useAppStoreOut } from '@/store/module/app'

NProgress.configure({ showSpinner: false })

export const progressGuard = (router: Router) => {
  router.beforeEach(() => {
    const appStore = useAppStoreOut()
    appStore.setLoading(true)
    NProgress.start()
  })
  router.afterEach(() => {
    const appStore = useAppStoreOut()
    appStore.setLoading(false)
    NProgress.done()
  })
}
