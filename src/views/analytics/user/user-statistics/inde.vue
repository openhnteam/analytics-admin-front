<template>
  <common-page class="view-analytics-app-user">
    <template #headerTitle> 用户统计 </template>
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
          :pagination="false"
          :data-source="paramTable"
          :loading="loading"
          row-key="id"
        >
          <template #backUv="{ record }">{{ record.backUv?.toLocaleString() || record.backUv }}</template>
          <template #newUv="{ record }">{{ record.newUv?.toLocaleString() || record.newUv }}</template>
          <template #uv="{ record }">{{ record.uv?.toLocaleString() || record.uv }}</template>
        </a-table>
      </a-card>
    </template>
  </common-page>
</template>
<script lang="ts" setup>
import { useMoment } from '@/hooks/useMoment'
import { useApplicationStore } from '@/store/module/application'
import { getUserList } from '@/api/request/user'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import { UserItem } from '@/api/model/appUser'
const { period, timestampList } = useMoment()
const store = useApplicationStore()
const paramTable = ref<UserItem[]>([])
const dateList = ref<Array<string>>([])

type Series = {
  key: string
  type: string
  name: string
  data: Array<number>
}
const seriesList = ref<Array<Series>>([
  {
    key: 'total',
    type: 'line',
    name: '活跃用户',
    data: []
  },
  {
    key: 'new',
    name: '新增用户',
    type: 'line',
    data: []
  },
  {
    key: 'back',
    name: '回访用户',
    type: 'line',
    data: []
  }
])

const columns = ref<ColumnProps[]>([
  {
    title: '日期',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '活跃用户',
    dataIndex: 'uv',
    key: 'uv',
    slots: { customRender: 'uv' },
    sorter: (a: UserItem, b: UserItem) => a.backUv - b.backUv
  },
  {
    title: '新增用户',
    dataIndex: 'newUv',
    key: 'newUv',
    slots: { customRender: 'newUv' },
    sorter: (a: UserItem, b: UserItem) => a.newUv - b.newUv
  },
  {
    title: '回访用户',
    dataIndex: 'backUv',
    key: 'backUv',
    slots: { customRender: 'backUv' },
    sorter: (a: UserItem, b: UserItem) => a.uv - b.uv
  }
])
const loading = ref(false)

const queryUserList = async () => {
  try {
    loading.value = true
    const { success, data } = await getUserList({
      appId: store.currentApplicationID,
      period: JSON.stringify(timestampList.value)
    })
    if (success && data) {
      dateList.value = []
      seriesList.value.forEach((series) => {
        series.data = []
      })
      if (Array.isArray(data?.list)) {
        const count = data.list.reduce(
          (acc, curr) => {
            acc.total += curr.backUv
            acc.newTotal += curr.newUv
            acc.back += curr.uv
            return acc
          },
          { total: 0, newTotal: 0, back: 0 }
        )
        data.list.forEach((item) => {
          dateList.value.push(item.id)
          seriesList.value.forEach((series: Series) => {
            switch (series.key) {
              case 'total':
                series.data.push(item.backUv)
                series.name = `活跃用户（${count.total.toLocaleString()}）`
                break
              case 'new':
                series.data.push(item.newUv)
                series.name = `新增用户（${count.newTotal.toLocaleString()}）`
                break
              case 'back':
                series.data.push(item.uv)
                series.name = `回访用户（${count.back.toLocaleString()}）`
                break
            }
          })
        })
        paramTable.value = data.list.reverse()
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
watch([() => period.value, () => store.currentApplicationID], () => {
  queryUserList()
})
onMounted(() => {
  queryUserList()
})
</script>

<!-- <script lang="ts">
export default {
  name: 'UserStatistics'
}
</script> -->
<style lang="less" scoped></style>
