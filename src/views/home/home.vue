<template>
  <common-page class="view-home">
    <template #headerTitle>
      <a-button type="primary" @click="createApplicationClick">
        <div class="create-application-div">
          <img src="@/assets/images/home/create-application.png" />
          创建应用
        </div>
      </a-button>
    </template>
    <template #headerExtra>
      <FilterApplication @changeViewEmit="changeViewEmit" @applicationTypeChangeEmit="applicationTypeChangeEmit"
        @applicationSortChangeEmit="applicationSortChangeEmit" @applicationNameClickEmit="applicationNameClickEmit">
      </FilterApplication>
    </template>
    <template #default>
      <div class="center-global mt-14" v-if="applicationStore.loadingApplication">
        <a-spin size="large" />
      </div>
      <div class="card-content" v-if="!applicationStore.loadingApplication">
        <transition name="fade" mode="out-in" v-if="applicationStore.applicationList.length > 0">
          <transition-group tag="div" :name="'flip-list'" v-if="!isShowList"
            class="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 ml-3 mr-3 mb-3">
            <template v-for="item in applicationStore.applicationList">
              <ApplicationCard :allApplicationItem="item"></ApplicationCard>
            </template>
          </transition-group>
          <template v-else>
            <div class="enter-y w-screen">
              <div class="application-list">
                <ApplicationList></ApplicationList>
              </div>
            </div>
          </template>
        </transition>
        <div v-else class="w-full flex justify-center mt-14">
          <a-empty />
        </div>
      </div>
    </template>
  </common-page>
  <CreateApplicationDialog></CreateApplicationDialog>
</template>
<script lang="ts" setup>
import FilterApplication from '@/views/home/components/FilterApplication.vue'
import ApplicationCard from '@/views/home/components/ApplicationCard.vue'
import ApplicationList from '@/views/home/components/ApplicationList.vue'
import CreateApplicationDialog from '@/views/home/components/CreateApplicationDialog.vue'
import { useApplicationStore } from '@/store/module/application'
import clonedeep from 'lodash.clonedeep'
import { ApplicationSort } from '@/enums/application'

const applicationStore = useApplicationStore()
const isShowList = ref<boolean>(false)
const createApplicationClick = () => {
  applicationStore.setCreateApplicationModal(true)
}

const changeViewEmit = (val: boolean) => {
  isShowList.value = val
}

const applicationTypeChangeEmit = (val: number) => {
  const list = clonedeep(applicationStore.allApplicationList)
  const filterApplicationList = list.filter((item) => {
    if (val === 0) {
      return true
    }
    return item.type === val
  })
  applicationStore.setApplicationList(filterApplicationList)
}

const applicationSortChangeEmit = (val: string) => {
  const list = clonedeep(applicationStore.allApplicationList)
  switch (val) {
    case ApplicationSort.默认排序:
      break
    case ApplicationSort.活跃用户:
      list.sort((a, b) => b.avg7DaysUv - a.avg7DaysUv)
      break
    case ApplicationSort.累计用户:
      list.sort((a, b) => b.totalUv - a.totalUv)
      break
    case ApplicationSort.新增用户:
      list.sort((a, b) => b.avg7DaysNewUv - a.avg7DaysNewUv)
      break
    case ApplicationSort.打开次数:
      list.sort((a, b) => b.yesterdayPv - a.yesterdayPv)
      break
    default:
      break
  }
  applicationStore.setApplicationList(list)
}

const applicationNameClickEmit = (val: string) => {
  const filterApplicationList = applicationStore.allApplicationList.filter((item) => {
    return item.name.indexOf(val) !== -1
  })
  applicationStore.setApplicationList(filterApplicationList)
}
</script>
<script lang="ts">
export default {
  name: 'ViewHome'
}
</script>
<style lang="less" scoped>
:deep(.table-row-current) {
  background-color: @primary-background-color;
}

.view-home {
  .create-application-div {
    display: flex;
    align-items: center;

    img {
      margin-right: 8px;
      height: 16px;
      width: 16px;
    }
  }

  .card-content {
    height: calc(100vh - 142px);
    overflow-y: scroll;

    .application-card {
      padding: 0 12px;
      display: flex;
      flex-wrap: wrap;
    }

    .application-list {
      margin: 1.25rem;
      padding: 1.25rem;
      background: #fff;
      border-radius: 4px;
    }
  }
}
</style>
