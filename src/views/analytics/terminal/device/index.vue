<template>
  <common-page class="view-analytics-app-user">
    <template #headerTitle> 设备 </template>
    <template #headerExtra>
      <range-picker v-model:value="period" :today="true" />
    </template>
    <template #default>
      <div class="grid grid-cols-2 gap-4 enter-y">
        <a-card :loading="loading">
          <bar-or-pie-chart
            text="活跃用户"
            class="w-full"
            catalog-key="id"
            :data="metricList"
            sort-key="uv"
            no-data-message="活跃用户暂无数据"
          />
        </a-card>
        <a-card :loading="loading">
          <bar-or-pie-chart
            text="新增用户"
            class="w-full"
            catalog-key="id"
            :data="metricList"
            sort-key="newUv"
            no-data-message="新增用户暂无数据"
          />
        </a-card>
      </div>
      <a-card class="enter-y !mt-4">
        <a-table
          row-key="id"
          class="enter-y"
          :columns="columns"
          :loading="loading"
          :pagination="pagination"
          :data-source="metricList"
          @change="handleTableChange"
        >
          <template #pv="{ record }">{{ record.pv?.toLocaleString() || record.pv }}</template>
          <template #newUv="{ record }">{{ record.newUv?.toLocaleString() || record.newUv }}</template>
          <template #uv="{ record }">{{ record.uv?.toLocaleString() || record.uv }}</template>
        </a-table>
      </a-card>
    </template>
  </common-page>
</template>
<script lang="ts" setup>
// @ts-ignore
import { useMoment } from '@/hooks/useMoment'

// @ts-ignore
import { usePaginationRemote } from '@/hooks/usePagination'
import { useMetric } from '@/hooks/useMetric'
import { useApplicationStore } from '@/store/module/application'
import { IMetricRecord } from '@/api/model/metric'
const { pagination, resetPagination, handlePaginationChange: handleTableChange } = usePaginationRemote({ pageSize: 10 })
const store = useApplicationStore()
const { period, timestampList } = useMoment()
const { getMetricList, loading, metricList } = useMetric()

const columns = [
  {
    title: '设备型号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '活跃会话',
    dataIndex: 'pv',
    key: 'pv',
    slots: { customRender: 'pv' },
    sorter: (a: IMetricRecord, b: IMetricRecord) => a.pv - b.pv
  },
  {
    title: '活跃用户',
    dataIndex: 'uv',
    key: 'uv',
    slots: { customRender: 'uv' },
    sorter: (a: IMetricRecord, b: IMetricRecord) => a.uv - b.uv
  },
  {
    title: '新增用户',
    dataIndex: 'newUv',
    key: 'newUv',
    slots: { customRender: 'newUv' },
    sorter: (a: IMetricRecord, b: IMetricRecord) => a.newUv - b.newUv
  }
]

const init = () => {
  getMetricList(
    {
      appId: store.currentApplicationID,
      metric: 'devices',
      period: JSON.stringify(timestampList.value),
      page: pagination.current,
      pageSize: pagination.pageSize
    },
    pagination
  )
}

watch([() => period.value, () => store.currentApplicationID], () => {
  resetPagination()
  init()
})
watch([() => pagination.current], () => {
  init()
})
onMounted(() => {
  init()
})
</script>

<script lang="ts">
export default {
  name: 'UserStatistics'
}
</script>
<style lang="less" scoped></style>
