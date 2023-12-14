<template>
  <common-page>
    <template #headerTitle>用户路径</template>
    <template #headerExtra>
      <range-picker v-model:value="period" />
    </template>
    <template #headerContent>
      <a-divider />
      <div class="flex items-center w-120">
        <a-input v-model:value="userID" placeholder="请输入用户 ID" />
        <a-button class="ml-3.5" type="primary" @click="onSearch(false)">搜索</a-button>
        <a-button class="ml-1.5" @click="onSearch(true)">重置</a-button>
      </div>
    </template>
    <template #default>
      <a-card class="enter-y !mt-4">
        <a-table
          class="enter-y"
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          row-key="sid"
          @change="handleTableChange"
        >
          <template #duration="{ record }">
            <span>{{ formatTime(record.totalDuration) }}</span>
          </template>
          <template #page="{ record }">
            <span v-if="record.pages.length">{{ record.pages[record.pages.length - 1].page }} </span>
            <span v-else>-</span>
          </template>
          <template #action="{ record }">
            <a @click="showPath(record)">查看路径</a>
          </template>
        </a-table>
        <a-drawer v-model:visible="visible" width="390px" title="页面访问路径" placement="right">
          <a-steps direction="vertical" size="small" :current="0">
            <a-step
              v-for="(item, idx) in stepsData"
              :key="idx"
              :title="`${item.page}（${formatTime(item.duration)}）`"
            />
          </a-steps>
        </a-drawer>
      </a-card>
    </template>
  </common-page>
</template>

<script setup lang="ts">
import { useMoment } from '@/hooks/useMoment'
import { useApplicationStore } from '@/store/module/application'
import { usePaginationRemote } from '@/hooks/usePagination'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import { getAccessPath } from '@/api/request/participation'
import { IPageItem, IPath } from '@/api/model/participation'

const { period, timestampList } = useMoment()
const store = useApplicationStore()
const { pagination, resetPagination, handlePaginationChange: handleTableChange } = usePaginationRemote({ pageSize: 10 })
const columns = ref<ColumnProps[]>([
  {
    title: '会话ID',
    dataIndex: 'sid',
    key: 'sid'
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: '访问时间',
    dataIndex: 'visitTime',
    key: 'visitTime'
  },
  {
    title: '访问时长',
    dataIndex: 'totalDuration',
    key: 'totalDuration',
    slots: { customRender: 'duration' }
  },
  {
    title: '最后访问页面',
    key: 'page',
    slots: { customRender: 'page' }
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
])
const dataSource = ref<Array<IPageItem>>([])
const loading = ref(false)
const visible = ref(false)
const userID = ref('')
const stepsData = ref<IPath[]>([])

const queryData = () => {
  if (!store.currentApplicationID) return
  loading.value = true
  getAccessPath({
    appId: store.currentApplicationID,
    period: JSON.stringify(timestampList.value),
    userId: userID.value,
    page: pagination.current,
    pageSize: pagination.pageSize
  })
    .then((res) => {
      if (res.success && res.data) {
        pagination.total = res.data.count ?? 0
        dataSource.value = res.data?.list || []
      }
    })
    .finally(() => {
      loading.value = false
    })
}

const showPath = (record: IPageItem) => {
  stepsData.value = record.pages
  visible.value = true
}

const formatTime = (val: number) => {
  if (!val) {
    return '0'
  }
  const time = val / 1000
  const day = Math.floor(time / 60 / 60 / 24)
  const hour = Math.floor(time / 60 / 60) % 24
  const minute = Math.floor(time / 60) % 60
  const second = Math.floor(time) % 60
  let text = `${second}秒`
  if (day && hour && minute) {
    text = `${day}天${hour}小时${minute}分钟${text}`
  } else if (hour && minute) {
    text = `${hour}小时${minute}分钟${text}`
  } else if (minute) {
    text = `${minute}分钟${text}`
  }
  return text
}

const onSearch = (reset: boolean) => {
  if (reset) {
    userID.value = ''
  }
  resetPagination()
  queryData()
}

watch([() => period.value, () => store.currentApplicationID], () => {
  resetPagination()
  queryData()
})
watch([() => pagination.current], () => {
  queryData()
})
onMounted(() => {
  queryData()
})
</script>

<style scoped>
.ant-divider-horizontal {
  margin: 0 0 19px;
}
</style>
