<template>
  <a-card :loading="loading">
    <div :class="['application-item-content']">
      <div class="header">
        <span class="title">{{ allApplicationItem?.name }}</span>
        <div class="more">
          <span @click="goStatisticalClick(allApplicationItem)">统计概览</span>
          <div></div>
          <span @click="goSetClick(allApplicationItem)">应用设置</span>
        </div>
      </div>
      <div class="data-content">
        <div class="left">
          <DataItem :count="avg7DaysUv" :sub-title="'活跃用户（7日平均）'" :is-hight="true"
            @click="goStatisticalClick(allApplicationItem)"></DataItem>
          <DataItem :count="totalUv" :sub-title="'累计用户'" @click="goStatisticalClick(allApplicationItem)"></DataItem>
        </div>
        <div class="right">
          <DataItem :count="avg7DaysNewUv" :sub-title="'新增用户（7日平均）'" @click="goStatisticalClick(allApplicationItem)">
          </DataItem>
          <DataItem :count="yesterdayPv" :sub-title="'昨日打开次数'" @click="goStatisticalClick(allApplicationItem)"></DataItem>
        </div>
      </div>
      <div class="space-line" />
      <div class="echart-content">
        <div class="title">活跃趋势（最近30天）</div>
        <line-chart :text="''" :subtext="''" :show-yaxis="false" :show-xaxis="false" class="w-full h-32 mt-2"
          :x-data="dateList" :y-data="yDataList" no-data-message="暂无近三十日活跃趋势数据" />
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import DataItem from './DataItem.vue'
import { AllApplicationType } from '@/api/model'
import { getDashbordHome, getUserDashbordList } from '@/api/request'
import { useMoment } from '@/hooks/useMoment'
import { useApplicationStore } from '@/store/module/application'

interface Props {
  allApplicationItem: AllApplicationType
  isMargin?: boolean
}
const applicationStore = useApplicationStore()
const props = withDefaults(defineProps<Props>(), {})
const yesterdayPv = ref<number>(0)
const totalUv = ref<number>(0)
const avg7DaysNewUv = ref<number>(0)
const avg7DaysUv = ref<number>(0)
const yDataList = ref<Array<number | string>>([])
const { dateList, timestampList } = useMoment()
const router = useRouter()
const loading = ref<boolean>(false)

const getData = () => {
  loading.value = true
  getDashbordHome({ appId: props?.allApplicationItem?.appId }).then(res => {
    yesterdayPv.value = res?.data?.yesterdayPv || 0
    totalUv.value = res?.data?.totalUv || 0
    avg7DaysNewUv.value = res?.data?.avg7DaysNewUv || 0
    avg7DaysUv.value = res?.data?.avg7DaysUv || 0
    applicationStore.setItemDashbord(props?.allApplicationItem?.appId, res.data)
  }).finally(() => {
    loading.value = false
  })
  getUserDashbordList({ appId: props?.allApplicationItem?.appId, period: JSON.stringify(timestampList.value) }).then(res => {
    yDataList.value = res?.data?.list?.map(item => item.uv) || []
  })
}

const goStatisticalClick = (record: AllApplicationType) => {
  applicationStore.setCurrentApplicationID(record.appId)
  applicationStore.setCurrentApplicationName(record.name)
  router.push({
    name: 'ViewStatistics'
  })
}

const goSetClick = (record: AllApplicationType) => {
  applicationStore.setCurrentApplicationID(record.appId)
  applicationStore.setCurrentApplicationName(record.name)
  router.push({
    name: 'ViewApplicationSet'
  })
}

watch(() => props.allApplicationItem.appId, () => {
  getData()
})

onMounted(() => {
  getData()
})
</script>
<script lang="ts">
export default {
  name: 'ApplicationCard'
}
</script>
<style lang="less" scoped>
.application-item-content {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .title {
      font-size: 1rem;
      font-weight: 600;
      color: #111111;
    }

    .more {
      display: flex;
      align-items: center;

      span {
        color: #0052D9;
        font-size: 14px;
        cursor: pointer;
      }

      div {
        width: 1px;
        height: 16px;
        background: #E0E0E0;
        margin: 0 8px;
      }
    }
  }

  .data-content {
    display: flex;

    .left {
      flex: 1;
    }

    .right {
      flex: 1;
      margin-left: 0.5rem;
    }
  }

  .space-line {
    margin-top: 0.5rem;
    height: 1px;
    background: #e0e0e0;
  }

  .echart-content {
    margin-top: 1rem;

    .title {
      height: 1.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #111111;
    }
  }
}
</style>
    