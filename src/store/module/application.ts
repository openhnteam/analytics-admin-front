import { defineStore } from 'pinia'
import { store } from '@/store'
import { getAllApplication } from '@/api/request'
import { AllApplicationType, DashboardHomeType } from '@/api/model'
import clonedeep from 'lodash.clonedeep'

export interface ApplicationState {
  createModalVisable: boolean
  applicationList: Array<AllApplicationType & DashboardHomeType>
  allApplicationList: Array<AllApplicationType & DashboardHomeType>
  currentApplicationID: string
  currentApplicationName: string
  loadingApplication: boolean
  currentApplicationItem: AllApplicationType
}

export const useApplicationStore = defineStore({
  id: 'application',
  state: (): ApplicationState => ({
    createModalVisable: false,
    applicationList: [],
    allApplicationList: [],
    currentApplicationID: '',
    currentApplicationName: '',
    loadingApplication: false,
    currentApplicationItem: {
      name: '',
      type: '',
      appId: '',
      salt: '',
      createTime: '',
      key: ''
    }
  }),
  getters: {
    getCreateModalVisable(state) {
      return state.createModalVisable
    }
  },
  actions: {
    setApplicationList(applicationList: AllApplicationType[]) {
      this.applicationList = applicationList
    },
    setCreateApplicationModal(val: boolean) {
      this.createModalVisable = val
    },
    setCurrentApplicationID(currentApplicationID: string) {
      this.currentApplicationID = currentApplicationID
      this.currentApplicationItem = this.allApplicationList.find(
        (item: AllApplicationType & DashboardHomeType) => item.appId === currentApplicationID
      )
    },
    updateApplicationInfo(appId: string, name: string, type: string | number) {
      this.allApplicationList = this.allApplicationList.map((item: AllApplicationType & DashboardHomeType) => {
        if (item.appId === appId) {
          return {
            ...item,
            name,
            type
          }
        }
        return item
      })
    },
    setCurrentApplicationName(name: string) {
      this.currentApplicationName = name
    },
    setItemDashbord(appId: string, val: DashboardHomeType) {
      this.applicationList = this.applicationList.map((item: AllApplicationType & Partial<DashboardHomeType>) => {
        if (item.appId === appId) {
          return {
            ...item,
            ...val
          }
        }
        return item
      })
      this.allApplicationList = this.allApplicationList.map((item: AllApplicationType & Partial<DashboardHomeType>) => {
        if (item.appId === appId) {
          return {
            ...item,
            ...val
          }
        }
        return item
      })
    },
    getAllApplicationList() {
      try {
        this.loadingApplication = true
        getAllApplication().then((res) => {
          if (res.success) {
            this.setApplicationList(clonedeep(res.data.list))
            this.allApplicationList = clonedeep(res.data.list)
            if (!this.currentApplicationID && res?.data?.list?.length > 0) {
              this.setCurrentApplicationID(res.data.list[0].appId)
              this.setCurrentApplicationName(res.data.list[0].name)
            }
            setTimeout(() => {
              this.loadingApplication = false
            }, 100)
          }
        })
      } catch (error) {}
    }
  }
})

export function useApplicationStoreOut() {
  return useApplicationStore(store)
}
