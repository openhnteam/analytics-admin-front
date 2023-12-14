<template>
  <common-page>
    <template #headerTitle>
      <div class="flex items-center">
        <div class="title">使用时长</div>
        <a-popover placement="rightTop">
          <IconFont type="icon-question-circle" class="text-primary-color ml-2" />
          <template #content>
            <div>
              <p>记录 {{ periodFormat }} 期间，每次会话 <span class="text-primary-color">持续的时间</span></p>
              <p>按 {{ durationRange.join('、') }}，进行统计分析</p>
            </div>
          </template>
        </a-popover>
      </div>
    </template>
    <template #headerExtra>
      <range-picker v-model:value="period" :today="true" />
    </template>
    <template #default>
      <a-card class="enter-y !py-2" :loading="loading">
        <div class="sub-title">时长区间</div>
        <multi-bar-chart
          class="w-full"
          :automate="true"
          :series-list="seriesList"
          :x-data="dataSource.map((item) => item.id)"
        />
        <div class="w-full flex justify-center mt-3.5 mb-3.5">
          <a-button type="primary" ghost class="btn" @click="expand = !expand">
            明细数据
            <DownOutlined style="font-size: 12px" v-show="!expand" />
            <UpOutlined v-show="expand" />
          </a-button>
        </div>
        <a-divider v-show="expand" />
        <a-table
          v-show="expand"
          class="enter-y table-box"
          :columns="columns"
          :pagination="false"
          :data-source="dataSource"
          row-key="id"
        >
          <template #count="{ record }">{{ record.count?.toLocaleString() || record.count }}</template>
        </a-table>
      </a-card>
      <a-card class="enter-y !py-2 !mt-4" :loading="trendLoading">
        <div class="sub-title">总时长趋势</div>
        <stacked-line-chart
          grid-left="2%"
          grid-right="4%"
          :x-data="trendXData"
          :series-list="trendList"
          :multi-y-axis="true"
          class="w-full h-96"
        />
        <div class="w-full flex justify-center mt-3.5 mb-3.5">
          <a-button type="primary" ghost class="btn" @click="secondExpand = !secondExpand">
            明细数据
            <DownOutlined style="font-size: 12px" v-show="!secondExpand" />
            <UpOutlined v-show="secondExpand" />
          </a-button>
        </div>
        <a-divider v-show="secondExpand" />
        <a-table
          v-show="secondExpand"
          class="enter-y table-box"
          :columns="sessionColumns"
          :pagination="false"
          :data-source="sessionList"
          row-key="id"
        >
          <template #uv="{ record }">{{ record.uv?.toLocaleString() || record.uv }}</template>
          <template #duration="{ record }">{{ record.duration?.toLocaleString() || record.duration }}</template>
        </a-table>
      </a-card>
    </template>
  </common-page>
</template>

<script setup lang="ts">
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { useMoment } from '@/hooks/useMoment'
import { getSessionDuration, getSessionList } from '@/api/request/participation'
import { useApplicationStore } from '@/store/module/application'
import { ISessionDuration, ISessionItem } from '@/api/model/participation'
import dayjs from 'dayjs'

const { period, timestampList, periodFormat } = useMoment()
const store = useApplicationStore()
const durationRange = [
  '0 - 10 秒',
  '11 - 30 秒',
  '31 - 60 秒',
  '1 - 3 分',
  '3 - 10 分',
  '10 - 30 分',
  '30 - 60 分',
  '> 1 小时'
]
interface Series {
  name: string
  data: number[]
  type?: string
  position?: string
  yAxisIndex?: number
  yAxisName?: string
}
const seriesList = ref<Array<Series>>([])
const sessionList = ref<Array<ISessionItem>>([])
const dataSource = ref<Array<ISessionDuration>>([])
const loading = ref(false)
const trendLoading = ref(false)
const expand = ref(false)
const secondExpand = ref(false)
const trendXData = ref<string[]>([])
const columns = [
  {
    title: '会话使用时长',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'descend',
    sorter: (a: ISessionDuration, b: ISessionDuration) => {
      return durationRange.indexOf(b.id) - durationRange.indexOf(a.id)
    }
  },
  {
    title: '活跃会话',
    dataIndex: 'count',
    key: 'count',
    slots: { customRender: 'count' },
    sorter: (a: ISessionDuration, b: ISessionDuration) => a.count - b.count
  },
  {
    title: '百分比',
    dataIndex: 'percent',
    key: 'percent'
  }
]
const sessionColumns = [
  {
    title: '日期',
    dataIndex: 'id',
    key: 'id',
    defaultSortOrder: 'descend'
  },
  {
    title: '总时长',
    dataIndex: 'duration',
    key: 'duration',
    slots: { customRender: 'duration' },
    sorter: (a: ISessionItem, b: ISessionItem) => a.duration - b.duration
  },
  {
    title: '活跃用户',
    dataIndex: 'uv',
    key: 'uv',
    slots: { customRender: 'uv' },
    sorter: (a: ISessionItem, b: ISessionItem) => a.uv - b.uv
  }
]
const trendList = ref<Series[]>([])

const querySessionDuration = () => {
  if (!store.currentApplicationID) return
  loading.value = true
  dataSource.value = []
  getSessionDuration({
    appId: store.currentApplicationID,
    period: JSON.stringify(timestampList.value)
  })
    .then((res) => {
      if (res.success && res.data) {
        seriesList.value = [
          {
            name: '使用时长',
            data: res.data.map((it) => it.count)
          }
        ]
        dataSource.value = res.data
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const querySessionList = () => {
  if (!store.currentApplicationID) return
  trendLoading.value = true
  trendXData.value = []
  trendList.value = []
  sessionList.value = []
  getSessionList({
    appId: store.currentApplicationID,
    period: JSON.stringify(timestampList.value)
  })
    .then((res) => {
      if (res.success && res.data?.list) {
        let duration = 0,
          uv = 0
        trendXData.value = res.data.list.map((it) => it.id)
        const series: Series[] = [
          {
            name: '总时长',
            type: 'line',
            data: [],
            yAxisIndex: 0,
            yAxisName: '单位：秒'
          },
          {
            name: '活跃用户',
            type: 'line',
            data: [],
            yAxisIndex: 1,
            yAxisName: '单位：人'
          }
        ]
        res.data.list.forEach((it) => {
          series[0].data.push(it.duration)
          series[1].data.push(it.uv)
          duration += it.duration
          uv += it.uv
        })
        series[0].name = `总时长（${duration.toLocaleString()}秒）`
        series[1].name = `活跃用户（${uv.toLocaleString()}人）`
        trendList.value = series
        sessionList.value = res.data.list.sort((a, b) => {
          return dayjs(a.id).isAfter(dayjs(b.id)) ? -1 : 1
        })
      }
    })
    .finally(() => {
      trendLoading.value = false
    })
}

watch([() => period.value, () => store.currentApplicationID], () => {
  querySessionDuration()
  querySessionList()
})
onMounted(() => {
  querySessionDuration()
  querySessionList()
})
</script>

<style scoped lang="less">
.title {
  color: #111;
  font-size: 20px;
  font-weight: 600;
}

.sub-title {
  color: #111;
  font-weight: 600;
  font-size: 16px;
}

.btn {
  display: flex;
  align-items: center;
}
</style>
