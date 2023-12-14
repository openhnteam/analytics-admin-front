<template>
  <common-page class="view-analytics-device">
    <template #headerTitle>
      <div class="flex items-center">
        场景来源
        <a-popover placement="rightTop">
          <IconFont type="icon-question-circle" class="text-primary-color ml-2" />
          <template #content>
            <div>
              <p>
                统计所有访问您的应用的<span class="text-primary-color"> 设备型号 </span
                >，如遇新设备类型未被跟踪，请联系管理员添加。
              </p>
              <p>
                <span class="text-primary-color">活跃会话：</span>该设备型号在 {{ periodFormat }} 期间产生的总会话次数
              </p>
              <p>
                <span class="text-primary-color">活跃用户：</span>该设备型号的用户在 {{ periodFormat }}
                期间访问您的应用的总数，同一设备只记一次。
              </p>
              <p>
                <span class="text-primary-color">新增用户：</span>该设备型号的新用户在 {{ periodFormat }}
                期间访问您的应用的总数，同一设备只记一次。
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
      <div class="grid grid-cols-1 enter-y !mt-4">
        <a-card :loading="loading">
          <div class="flex items-center">
            <div class="sub-title">场景值</div>
            <img src="@/assets/images/top-6.svg" alt="" />
          </div>
          <bar-chart
            class="w-full h-50"
            no-data-message="暂无数据"
            :max="6"
            :x-data="topMetricList.map((item) => ({ value: item.uv, name: item.id }))"
            :y-data="
              topMetricList.map((item) => (item.totalUv ? ((item.uv / item.totalUv) * 100).toFixed(2) : 0) + '%')
            "
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
          <template #action="{ record }">
            <a @click="showTrendChart(record)">趋势</a>
          </template>
        </a-table>
      </a-card>
      <a-modal :width="'50%'" v-model:visible="visible">
        <template #title>
          <span>
            <span>{{ trendModalTitle }}</span>
          </span>
        </template>
        <a-spin :spinning="spinning">
          <stacked-line-chart :x-data="trendXData" :series-list="trendSeries" class="w-full h-96" />
        </a-spin>
        <template #footer>
          <a-button @click="visible = false">关闭</a-button>
        </template>
      </a-modal>
    </template>
  </common-page>
</template>

<script setup lang="ts">
import { useMoment } from '@/hooks/useMoment'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
const { period, periodFormat, timestampList } = useMoment()
import { usePaginationRemote } from '@/hooks/usePagination'
import { useApplicationStore } from '@/store/module/application'
import { useMetric } from '@/hooks/useMetric'
import { getMetricTrendLine } from '@/api/request/metric'
import { FullMetric } from '@/api/model/metric'

type Series = {
  key: string
  type: string
  name: string
  data: Array<number>
}

const store = useApplicationStore()
const { getMetricList, loading, metricList, topMetricList } = useMetric(6)
const columns = ref<ColumnProps[]>([
  {
    title: '场景值',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '活跃会话',
    dataIndex: 'pv',
    key: 'pv'
  },
  {
    title: '活跃用户',
    dataIndex: 'uv',
    key: 'uv'
  },
  {
    title: '新增用户',
    dataIndex: 'newUv',
    key: 'newUv'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
])
const { pagination, handlePaginationChange: handleTableChange, resetPagination } = usePaginationRemote({ pageSize: 10 })
const visible = ref(false)
const spinning = ref(false)
const trendSeries = ref<Series[]>([])
const trendXData = ref<Array<string>>([])
const trendModalTitle = ref('')

const init = (refreshTopList = false) => {
  getMetricList(
    {
      appId: store.currentApplicationID,
      metric: 'scene',
      period: JSON.stringify(timestampList.value),
      page: pagination.current,
      pageSize: pagination.pageSize
    },
    pagination,
    refreshTopList
  )
}

const showTrendChart = async (record: FullMetric) => {
  try {
    trendXData.value = []
    trendSeries.value = []
    trendModalTitle.value = record.id
    visible.value = true
    spinning.value = true
    const { success, data } = await getMetricTrendLine({
      appId: store.currentApplicationID,
      period: JSON.stringify(timestampList.value),
      metric: 'scene',
      value: record.key || ''
    })
    if (success && data.list?.length) {
      trendXData.value = data.list.map((item) => item.id)
      const uvData = data.list.map((item) => item.uv)
      const newUvData = data.list.map((item) => item.newUv)
      trendSeries.value = [
        {
          key: 'uv',
          name: `活跃用户（${record.totalUv}）`,
          type: 'line',
          data: uvData
        },
        {
          key: 'new',
          name: `新增用户（${record.totalNewUv}）`,
          type: 'line',
          data: newUvData
        }
      ]
    }
  } catch (e) {
    console.error(e)
  } finally {
    spinning.value = false
  }
}

watch([() => period.value, () => store.currentApplicationID], () => {
  resetPagination()
  init(true)
})
watch([() => pagination.current], () => {
  init()
})
tryOnMounted(() => init(true))
</script>

<style lang="less" scoped>
.sub-title {
  color: #111;
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
}
</style>
