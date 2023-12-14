<template>
  <common-page class="view-analytics-app-user">
    <template #headerTitle>地域分析</template>
    <template #headerExtra>
      <range-picker v-model:value="period" :today="true"/>
    </template>
    <template #default>
      <a-card>
        <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
          <a-tab-pane v-for="it in panes" :key="it.key" :tab="it.name" />
        </a-tabs>
        <a-table
          class="enter-y"
          :columns="columns"
          :pagination="false"
          :data-source="dataSource"
          :loading="loading"
          row-key="id"
        >
          <template #area="{ record }">
            <div class="flex items-center cursor-pointer" @click="getAreaData(record)">
              <span :class="[panes.length < 2 ? 'area' : '']">{{ record.id }}</span>
              <CaretRightFilled v-if="panes.length < 2" class="ml-0.5 area" />
            </div>
          </template>
        </a-table>
      </a-card>
    </template>
  </common-page>
</template>

<script setup lang="ts">
import { useMoment } from '@/hooks/useMoment'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { getLocationList } from '@/api/request/terminal'
import { useApplicationStore } from '@/store/module/application'
import { ILocationItem } from '@/api/model/terminal'
import { CaretRightFilled } from '@ant-design/icons-vue'

const store = useApplicationStore()
const { period, timestampList } = useMoment()
const activeKey = ref('中国')
const columns = ref<ColumnProps[]>([
  {
    title: '省级行政区',
    dataIndex: 'id',
    key: 'id',
    slots: { customRender: 'area' }
  },
  {
    title: '访问用户数（占比）',
    dataIndex: 'uvFormat',
    key: 'uvFormat'
  },
  {
    title: '访问次数（占比）',
    dataIndex: 'pvFormat',
    key: 'pvFormat'
  }
])
const dataSource = ref<Array<ILocationItem>>([])
const loading = ref(false)
const panes = ref([
  {
    key: '中国',
    name: '中国'
  }
])

const onTabChange = (key: string) => {
  if (key === '中国') {
    panes.value.splice(1)
  }
  dataSource.value = []
  queryData()
}
const getAreaData = (record: ILocationItem) => {
  if (panes.value.length >= 2) return
  panes.value.push({
    key: record.id,
    name: record.id
  })
  activeKey.value = record.id
  dataSource.value = []
  queryData()
}

const queryData = async () => {
  try {
    loading.value = true
    if (!store.currentApplicationID) return
    const { success, data } = await getLocationList({
      appId: store.currentApplicationID,
      period: JSON.stringify(timestampList.value),
      country: '中国',
      prov: activeKey.value !== '中国' ? activeKey.value : ''
    })
    if (success && data) {
      dataSource.value = data.list ?? []
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
const init = () => {
  queryData()
}

watch([() => period.value, () => store.currentApplicationID], () => {
  init()
})
onMounted(() => {
  init()
})
</script>

<style scoped lang="less">
.area {
  color: #0052d9;
}
</style>
