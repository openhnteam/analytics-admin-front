<template>
  <div class="application-List-content">
    <a-table :dataSource="applicationStore.applicationList" :columns="columns">
      <template #action="{ record }">
        <div class="action-content">
          <span @click="goStatisticalClick(record)">统计概览</span>
          <div class="interval-div" />
          <span @click="goSetClick(record)">应用设置</span>
        </div>
      </template>
      <template #avg7DaysUv="{ record }">{{ record.avg7DaysUv?.toLocaleString() || record.avg7DaysUv }}</template>
      <template #totalUv="{ record }">{{ record.totalUv?.toLocaleString() || record.totalUv }}</template>
      <template #avg7DaysNewUv="{ record }">{{ record.avg7DaysNewUv?.toLocaleString() || record.avg7DaysNewUv }}</template>
      <template #yesterdayPv="{ record }">{{ record.yesterdayPv?.toLocaleString() || record.yesterdayPv }}</template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { useApplicationStore } from '@/store/module/application'
import { AllApplicationType, DashboardHomeType } from '@/api/model'
const router = useRouter()

const applicationStore = useApplicationStore()
const columns = [
  {
    title: '应用名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '活跃用户（7日平均）',
    dataIndex: 'avg7DaysUv',
    key: 'avg7DaysUv',
    slots: { customRender: 'avg7DaysUv' }
  },
  {
    title: '累计用户',
    dataIndex: 'totalUv',
    key: 'totalUv',
    slots: { customRender: 'totalUv' }
  },
  {
    title: '新增用户（7日平均）',
    dataIndex: 'avg7DaysNewUv',
    key: 'avg7DaysNewUv',
    slots: { customRender: 'avg7DaysNewUv' }
  },
  {
    title: '昨日打开次数',
    dataIndex: 'yesterdayPv',
    key: 'yesterdayPv',
    slots: { customRender: 'yesterdayPv' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

const goStatisticalClick = (record: AllApplicationType & Partial<DashboardHomeType>) => {
  applicationStore.setCurrentApplicationID(record.appId)
  applicationStore.setCurrentApplicationName(record.name)
  router.push({
    name: 'ViewStatistics'
  })
}

const goSetClick = (record: AllApplicationType & Partial<DashboardHomeType>) => {
  applicationStore.setCurrentApplicationID(record.appId)
  applicationStore.setCurrentApplicationName(record.name)
  router.push({
    name: 'ViewApplicationSet'
  })
}

</script>
<script lang="ts">
export default {
  name: 'ApplicationList'
}
</script>
<style lang="less" scoped>
.action-content {
  display: flex;
  align-items: center;

  span {
    color: #0052d9;
    font-size: 0.875rem;
    cursor: pointer;
  }

  .interval-div {
    width: 1px;
    height: 1rem;
    margin: 0 0.5rem;
    background: #e0e0e0;
  }
}

.application-list-content {}
</style>
      