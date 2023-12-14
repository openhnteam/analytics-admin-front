import { defineStore } from 'pinia'
import { store } from '@/store'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes, flatAsyncRoutes } from '@/router/routes'
export interface PermissionState {
  isRoutesGenerated: boolean
  permCodeList: string[] | number[]
  asyncRoutes: RouteRecordRaw[]
  flatAsyncRoutes: RouteRecordRaw[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    isRoutesGenerated: false,
    permCodeList: [],
    asyncRoutes: [],
    flatAsyncRoutes: []
  }),
  getters: {
    getIsRoutesGenerated(state) {
      return state.isRoutesGenerated
    },
    getAysncRoutes(state) {
      return state.asyncRoutes
    },
    getFlatAysncRoutes(state) {
      return state.flatAsyncRoutes
    },
    getPermCodeList(state) {
      return state.permCodeList
    }
  },
  actions: {
    setIsRoutesGenerated(isRoutesGenerated: boolean) {
      this.isRoutesGenerated = isRoutesGenerated
    },
    setAysncRoutes(asyncRoutes: RouteRecordRaw) {
      this.asyncRoutes = asyncRoutes
    },
    setFlatAysncRoutes(flatAsyncRoutes: RouteRecordRaw) {
      this.flatAsyncRoutes = flatAsyncRoutes
    },
    setPermCodeList(permCodeList: string[] | number[]) {
      this.permCodeList = permCodeList
    },
    generateAsyncRoutes(): RouteRecordRaw[] {
      // 根据权限路由过滤暂时先不做，默认不过滤
      this.setAysncRoutes(asyncRoutes)
      this.setFlatAysncRoutes(flatAsyncRoutes)
      this.setIsRoutesGenerated(true)
      return this.flatAsyncRoutes
    },
    resetPermission() {
      this.setAysncRoutes([])
      this.setFlatAysncRoutes([])
      this.setIsRoutesGenerated(false)
    }
  }
})

export function usePermissionStoreOut() {
  return usePermissionStore(store)
}
