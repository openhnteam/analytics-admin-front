<template>
  <common-page class="view-analytics-app-user">
    <template #headerTitle>
      <div class="flex items-center">
        安装渠道
        <a-popover placement="rightTop">
          <IconFont type="icon-question-circle" class="text-primary-color ml-2" />
          <template #content>
            <div>
              <p>
                统计所有访问您的应用的<span class="text-primary-color"> 安装渠道 </span
                >，如遇新设备类型未被跟踪，请联系管理员添加。
              </p>
            </div>
          </template>
        </a-popover>
      </div>
    </template>
    <template #headerExtra>
      <range-picker v-model:value="period" :today="true" />
    </template>
    <template #default>
      <a-card :loading="loading">
        <pie-chart
          text="安装渠道"
          height="324px"
          class="w-full"
          :series-data="channelList"
          no-data-message="暂无渠道数据"
        />
      </a-card>
      <a-card class="!mt-4">
        <a-table
          row-key="id"
          class="enter-y"
          :columns="columns"
          :pagination="pagination"
          :data-source="metricList"
          :loading="loading"
          @change="handleTableChange"
        >
          <template #uv="{ record }">{{ record.uv?.toLocaleString() || record.uv }}</template>
        </a-table>
      </a-card>
    </template>
  </common-page>
</template>

<script setup lang="ts">
import { useMoment } from '@/hooks/useMoment'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { usePaginationRemote } from '@/hooks/usePagination'
import { useApplicationStore } from '@/store/module/application'
import { useMetric } from '@/hooks/useMetric'

const store = useApplicationStore()
const { period, timestampList } = useMoment()
const { getMetricList, loading, metricList } = useMetric()

const columns = ref<ColumnProps[]>([
  {
    title: '安装渠道',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '活跃用户',
    dataIndex: 'uv',
    key: 'uv',
    slots: { customRender: 'uv' }
  }
])
const { pagination, handlePaginationChange: handleTableChange, resetPagination } = usePaginationRemote({ pageSize: 10 })

const init = () => {
  getMetricList(
    {
      appId: store.currentApplicationID,
      metric: 'install_channel',
      period: JSON.stringify(timestampList.value),
      page: pagination.current,
      pageSize: pagination.pageSize
    },
    pagination
  )
}
const channelList = computed(() => {
  return metricList.value.map((item) => ({ name: item.id, value: item.uv }))
})
watch([() => period.value, () => store.currentApplicationID], () => {
  resetPagination()
  init()
})
watch([() => pagination.current], () => {
  init()
})
onMounted(init)
</script>

<style lang="less" scoped>
:deep(.ant-calendar-picker-input) {
  color: #111;
}
</style>
