<template>
  <common-page class="view-analytics-app-user">
    <template #headerTitle> 启动次数 </template>
    <template #headerExtra>
      <range-picker v-model:value="period" />
    </template>
    <template #default>
      <a-card class="enter-y !py-2" :loading="loading">
        <stacked-line-chart :x-data="dateList" :series-list="seriesList" class="w-full h-80" />
      </a-card>
      <a-card class="enter-y !mt-4">
        <a-table
          class="enter-y"
          :columns="columns"
          :loading="loading"
          :pagination="false"
          :data-source="paramTable"
          row-key="id"
        >
          <template #pv="{ record }">{{ record.pv?.toLocaleString() || record.pv }}</template>
          <template #newPv="{ record }">{{ record.newPv?.toLocaleString() || record.newPv }}</template>
          <template #uv="{ record }">{{ record.uv?.toLocaleString() || record.uv }}</template>
        </a-table>
      </a-card>
    </template>
  </common-page>
</template>
<script lang="ts" setup>
// @ts-ignore
import { useMoment } from '@/hooks/useMoment'
import { useApplicationStore } from '@/store/module/application'
import { getSessionList } from '@/api/request/participation'
import { ISessionItem } from '@/api/model/participation'
const { period, timestampList } = useMoment()
const store = useApplicationStore()

const paramTable = ref<Array<ISessionItem>>([])
const dateList = ref<string[]>([])
interface ISeries {
  type: string
  name: string
  data: Array<number>
}
const seriesList = ref<Array<ISeries>>([
  {
    type: 'line',
    name: '启动次数',
    data: []
  },
  {
    name: '新用户启动次数',
    type: 'line',
    data: []
  },
  {
    name: '活跃用户',
    type: 'line',
    data: []
  }
])

const columns = [
  {
    title: '日期',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '启动次数',
    dataIndex: 'pv',
    key: 'pv',
    slots: { customRender: 'pv' },
    sorter: (a: ISessionItem, b: ISessionItem) => a.pv - b.pv
  },
  {
    title: '新用户启动次数',
    dataIndex: 'newPv',
    key: 'newPv',
    slots: { customRender: 'newPv' },
    sorter: (a: ISessionItem, b: ISessionItem) => a.newPv - b.newPv
  },
  {
    title: '活跃用户',
    dataIndex: 'uv',
    key: 'uv',
    slots: { customRender: 'uv' },
    sorter: (a: ISessionItem, b: ISessionItem) => a.uv - b.uv
  }
]
const loading = ref(false)

const querySessionList = () => {
  if (!store.currentApplicationID) return
  loading.value = true
  dateList.value = []
  seriesList.value.forEach((series) => {
    series.data = []
  })
  getSessionList({
    appId: store.currentApplicationID,
    period: JSON.stringify(timestampList.value)
  })
    .then((res) => {
      if (res.success && res.data?.list) {
        const list = res.data.list
        if (Array.isArray(list)) {
          list.forEach((it) => {
            dateList.value.push(it.id)
            seriesList.value[0].data.push(it.pv)
            seriesList.value[1].data.push(it.newPv)
            seriesList.value[2].data.push(it.uv)
          })
          seriesList.value[0].name = `启动次数（${res.data?.pv.toLocaleString() || 0}）`
          seriesList.value[1].name = `新用户启动次数（${res.data?.newPv.toLocaleString() || 0}）`
          seriesList.value[2].name = `活跃用户（${res.data?.uv.toLocaleString() || 0}）`
          paramTable.value = list.reverse()
        }
      }
    })
    .finally(() => {
      loading.value = false
    })
}

watch([() => period.value, () => store.currentApplicationID], () => {
  querySessionList()
})
onMounted(() => {
  querySessionList()
})
</script>

<script lang="ts">
export default {
  name: 'UserStatistics'
}
</script>
<style lang="less" scoped></style>
