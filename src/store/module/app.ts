import { defineStore } from 'pinia'
import { store } from '@/store'

export interface AppState {
  loading: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    loading: false
  }),
  getters: {
    getLoading: (state) => {
      return state.loading
    }
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    }
  }
})

export function useAppStoreOut() {
  return useAppStore(store)
}
