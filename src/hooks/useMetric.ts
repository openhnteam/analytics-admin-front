import { FullMetric, GetMetricListReq } from '@/api/model/metric'
import { getMetricList } from '@/api/request/metric'
import { Pagination } from './usePagination'
import cloneDeep from 'lodash.clonedeep'

export function useMetric(top?: number) {
  const loading = ref(false)
  const metricList = ref<FullMetric[]>([])
  const topMetricList = ref<FullMetric[]>([])
  const lastAppId = ref('')

  const request = async (params: GetMetricListReq, page?: Nullable<Pagination>, refreshTopList?: boolean) => {
    try {
      loading.value = true
      if (lastAppId.value !== params.appId) {
        // appId 改变，重置数据
        metricList.value = []
        topMetricList.value = []
      }
      lastAppId.value = params.appId
      const { success, data } = await getMetricList(params)
      if (success) {
        if (!Array.isArray(data?.list)) return
        const count = data.list.reduce(
          (acc, cur) => {
            acc.totalNewUv += cur.newUv
            acc.totalPv += cur.pv
            acc.totalUv += cur.uv
            return acc
          },
          { totalNewUv: 0, totalPv: 0, totalUv: 0 }
        )
        metricList.value = data.list.map((it) => ({
          ...it,
          ...count
        }))
        if (refreshTopList && top) {
          topMetricList.value = cloneDeep(metricList.value.slice(0, top))
        }

        if (page) {
          page.total = data.count
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    getMetricList: request,
    loading,
    metricList,
    topMetricList
  }
}
