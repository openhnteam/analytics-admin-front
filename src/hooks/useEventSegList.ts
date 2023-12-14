import { getEventSegInfoList } from '@/api/request/event'
import { ISegInfoListData } from '@/api/model/events'
import { useApplicationStore } from '@/store/module/application'

export const useEventSegList = () => {
  const eventSegList = ref<Array<ISegInfoListData>>([])
  const eventSegId = ref<string>('')
  const loading = ref<boolean>(false)
  const applicationStore = useApplicationStore()

  const initData = (eventId: string, segStatus?: number): Promise<Array<ISegInfoListData>> => {
    loading.value = true
    return new Promise((resolve, reject) => {
      getEventSegInfoList({ appId: applicationStore.currentApplicationID, eventId: eventId, segStatus })
        .then((res) => {
          eventSegList.value = res.data || []
          if (res.data.length > 0) {
            eventSegId.value = res.data[0].segId
          }
          resolve(res?.data || [])
        })
        .catch(() => {
          reject([])
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    eventSegId,
    loading,
    eventSegList,
    getEventSegList: initData
  }
}
