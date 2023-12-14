<template>
  <common-page class="view-custom-analysis">
    <template #headerTitle>
      自定义事件明细
    </template>
    <template #headerExtra>
      <range-picker v-model:value="period" :show-time="{ format: 'HH:mm' }"
        @ok="onRangeChange" />
    </template>
    <template #headerContent>
      <div :class="['interval-div-global']"></div>
      <div :class="['event-content', 'mt-16']">
        <a-select v-model:value="eventId" class="button-content" @change="eventChange">
          <a-select-option :value="item.eventId" :key="item.eventId" v-for="item in eventList">
            {{ item.eventId }}
          </a-select-option>
        </a-select>
        <a-select v-model:value="eventSegId" class="button-content" @change="segIdChange">
          <a-select-option :value="item.segId" :key="item.segId" v-for="item in eventSegList">
            {{ item.segName }}
          </a-select-option>
        </a-select>
      </div>
    </template>
    <template #default>
      <a-card>
        <div class="w-full h-96 mt-4">
          <stacked-line-chart :x-data="dateList" :series-list="seriesList" class="w-full h-96" />
        </div>
        <EventDetailsTable :table-list="eventSegTable" :total="tableTotal" :period="JSON.stringify(timestampList)"
          :dateList="dateList" :eventId="eventId" :segId="eventSegId"></EventDetailsTable>
      </a-card>
    </template>
  </common-page>
</template>
<script lang="ts" setup>
import { useMoment } from '@/hooks/useMoment'
import EventDetailsTable from './compoments/EventDetailsTable.vue'
import { getStsList, getSegStsList } from '@/api/request/event'
import { EventSeriesItemType, IEventSegListParams, EventSegItemType } from '@/api/model/events'
import { useApplicationStore } from '@/store/module/application'
import { ECOption } from '@/utils/echarts'
import { useEventList } from '@/hooks/useEventList'
import { useEventSegList } from '@/hooks/useEventSegList'

const applicationStore = useApplicationStore()
const { period, dateList, timestampList } = useMoment(7, 1)
const { eventList, eventId } = useEventList()
const { eventSegList, eventSegId, getEventSegList } = useEventSegList()
const eventSegTable = ref<Array<EventSegItemType>>([])
const tableTotal = ref<number>(0)

const seriesList = ref<Array<Partial<ECOption & EventSeriesItemType>>>([
  {
    key: 'uv',
    type: 'line',
    name: `独立用户数`,
    data: []
  },
  {
    key: 'pv',
    name: `消息数量`,
    type: 'line',
    data: []
  }
])

const getEchartsData = () => {
  getStsList({ appId: applicationStore.currentApplicationID, period: JSON.stringify(timestampList.value), eventIds: [eventId.value] }).then(res => {
    if (res?.data?.length > 0) {
      seriesList.value = seriesList.value.map(item => {
        let data = res.data[0]?.list?.map(child => child.pv)
        if (item.key === 'uv') {
          data = res.data[0]?.list?.map(child => child.uv)
        }
        return {
          ...item,
          data
        }
      })
    }
  })
}

const getTableData = () => {
  const params: IEventSegListParams = {
    appId: applicationStore.currentApplicationID,
    period: JSON.stringify(timestampList.value),
    eventId: eventId.value,
    segId: eventSegId.value,
    key: '',
    page: 1,
    pageSize: 10
  }
  getSegStsList(params).then(res => {
    eventSegTable.value = res?.data?.list || []
    tableTotal.value = res?.data?.count || 0
  })
}

const getViewData = () => {
  getEchartsData()
  getEventSegList(eventId.value).then((res) => {
    if (res.length > 0) {
      getTableData()
    }
  })
}

const onRangeChange = () => {
  getEchartsData()
}

const eventChange = () => {
  getViewData()
}

const segIdChange = () => {
  getTableData()
}

watch([() => eventId.value], () => {
  getViewData()
})
</script>

<script lang="ts">
export default {
  name: 'EventAnalysis'
}
</script>
<style lang="less" scoped>
:deep(.ant-page-header-heading-title) {
  display: block !important;
  flex: 1;
}

.view-custom-analysis {

  .header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .event-content {
    .button-content {
      width: 224px;
      margin-right: 8px;
    }
  }
}
</style>