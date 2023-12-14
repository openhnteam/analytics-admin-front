import { defineStore } from 'pinia'
import { store } from '@/store'
import storage from '@/utils/storage'
import { LOCAL_TOKEN_KEY } from '@/enums/cache'
import { router } from '@/router'
import { VIEW_LOGIN_NAME, VIEW_CREATE_ACCOUNT_NAME } from '@/enums/view'

export interface UserInfo {
  active_app_id: string
  created_at: number
  email: string
  full_name: string
  global_admin: boolean
  last_login: number
  username: string
}

export interface UserState {
  token: string
  userInfo: UserInfo | null
  captchaKey: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: '',
    userInfo: null,
    captchaKey: ''
  }),
  getters: {
    getToken(state) {
      return state.token || storage.local.get(LOCAL_TOKEN_KEY) || ''
    },
    getUserInfo(state) {
      return state.userInfo
    },
    getUsername(state) {
      return state.userInfo?.username || ''
    }
  },
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
    },
    setToken(token: string) {
      storage.local.set(LOCAL_TOKEN_KEY, token)
      this.token = token
    },
    removeToken() {
      storage.local.remove(LOCAL_TOKEN_KEY)
      this.token = ''
    },
    async logout() {
      router.push({
        name: VIEW_LOGIN_NAME
      })
    },
    setup() {
      router.push({
        name: VIEW_CREATE_ACCOUNT_NAME
      })
    }
  }
})

export function useUserStoreOut() {
  return useUserStore(store)
}
