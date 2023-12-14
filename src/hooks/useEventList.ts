import { getEventInfoList } from '@/api/request/event'
import { IInfoListData } from '@/api/model/events'
import { useApplicationStore } from '@/store/module/application'

export const useEventList = (eventStatus?: number) => {
  const eventId = ref<string>('')
  const loading = ref<boolean>(false)
  const eventList = ref<Array<IInfoListData>>([])
  const applicationStore = useApplicationStore()

  const initData = (status?: number): Promise<Array<IInfoListData>> => {
    let _eventStatus = eventStatus
    if (status) {
      _eventStatus = status
    }
    loading.value = true
    return new Promise((resolve, reject) => {
      getEventInfoList({ appId: applicationStore.currentApplicationID, eventStatus: _eventStatus })
        .then((res) => {
          eventList.value = res?.data || []
          if (res?.data?.length > 0) {
            eventId.value = res?.data[0].eventId
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

  watch([() => applicationStore.currentApplicationID], () => {
    initData()
  })

  onMounted(() => {
    initData()
  })

  return {
    eventId,
    loading,
    eventList,
    getEventList: initData
  }
}
