<template>
  <common-page class="view-analytics-app-user">
    <template #headerTitle> 设备厂商 </template>
    <template #headerExtra>
      <range-picker v-model:value="period" :today="true" />
    </template>
    <template #default>
      <div class="grid grid-cols-2 gap-4 enter-y">
        <a-card :loading="loading">
          <div class="title">活跃用户</div>
          <horizontal-bar-char
            text="活跃用户"
            class="w-full h-80"
            :yData="yData"
            :xData="xData.uvData"
            color="#00C896"
          />
        </a-card>
        <a-card :loading="loading">
          <div class="title">新增用户</div>
          <horizontal-bar-char
            text="新增用户"
            class="w-full h-80"
            :yData="yData"
            :xData="xData.newUvData"
            color="#0052D9"
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
    title: '设备厂商',
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
      metric: 'vendor',
      period: JSON.stringify(timestampList.value),
      page: pagination.current,
      pageSize: pagination.pageSize
    },
    pagination
  )
}

const yData = computed(() => {
  return metricList.value.map((it) => it.id)
})

const xData = computed(() => {
  return {
    uvData: metricList.value.map((it) => ({
      name: it.id,
      value: it.uv,
      label: (it.totalUv ? ((it.uv / it.totalUv) * 100).toFixed(2) : 0) + '%'
    })),
    newUvData: metricList.value.map((it) => ({
      name: it.id,
      value: it.newUv,
      label: (it.totalNewUv ? ((it.newUv / it.totalNewUv) * 100).toFixed(2) : 0) + '%'
    }))
  }
})

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
<style lang="less" scoped>
.title {
  height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 20px;
}
</style>
