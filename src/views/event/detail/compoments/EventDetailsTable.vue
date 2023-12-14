<template>
    <div class="event-analysis-table">
        <div class="header">
            <a-button type="primary" @click="exportClick">导出数据</a-button>
            <a-input v-model:value="searchValue" placeholder="请输入关键字" class="search-input" @press-enter="searchClick">
                <template #prefix>
                    <svg t="1700189774456" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="7718" width="16" height="16">
                        <path
                            d="M862.609 816.955L726.44 680.785l-0.059-0.056a358.907 358.907 0 0 0 56.43-91.927c18.824-44.507 28.369-91.767 28.369-140.467 0-48.701-9.545-95.96-28.369-140.467-18.176-42.973-44.19-81.56-77.319-114.689-33.13-33.129-71.717-59.144-114.69-77.32-44.507-18.825-91.767-28.37-140.467-28.37-48.701 0-95.96 9.545-140.467 28.37-42.973 18.176-81.56 44.19-114.689 77.32-33.13 33.129-59.144 71.717-77.32 114.689-18.825 44.507-28.37 91.767-28.37 140.467 0 48.7 9.545 95.96 28.37 140.467 18.176 42.974 44.19 81.561 77.32 114.69 33.129 33.129 71.717 59.144 114.689 77.319 44.507 18.824 91.767 28.369 140.467 28.369 48.7 0 95.96-9.545 140.467-28.369 32.78-13.864 62.997-32.303 90.197-54.968 0.063 0.064 0.122 0.132 0.186 0.195l136.169 136.17c6.25 6.25 14.438 9.373 22.628 9.373 8.188 0 16.38-3.125 22.627-9.372 12.496-12.496 12.496-32.758 0-45.254z m-412.274-69.466c-79.907 0-155.031-31.118-211.534-87.62-56.503-56.503-87.62-131.627-87.62-211.534s31.117-155.031 87.62-211.534c56.502-56.503 131.626-87.62 211.534-87.62s155.031 31.117 211.534 87.62c56.502 56.502 87.62 131.626 87.62 211.534s-31.118 155.031-87.62 211.534c-56.503 56.502-131.627 87.62-211.534 87.62z"
                            fill="#CECECE" p-id="7719"></path>
                    </svg>
                </template>
            </a-input>
        </div>
        <a-table row-key="id" class="enter-y" :columns="columns" :pagination="pagination" :data-source="eventSegTable"
            @change="handleTableChange" :loading="tableLoading">
            <template #operation="{ record }">
                <span class="pointer-span-14" @click="openModalClick(record)">查看</span>
            </template>
        </a-table>
    </div>
    <a-modal :width="'50%'" v-model:visible="modalVisable" @ok="handleOk" :footer="null">
        <template #title>
            <span>
                <span>趋势明细</span>
            </span>
        </template>
        <div class="flex text-base justify-center mb-4">
            <div class="ml-2">
                <span>活跃用户数</span>（<span class="font-bold">{{ recordUserCount }}）</span>
            </div>
            <div>
                <span>总消息数</span>（<span class="font-bold">{{ recordMsgCount }}）</span>
            </div>
        </div>
        <stacked-line-chart :x-data="props.dateList" :series-list="seriesListEcharts" class="w-full h-96" gridRight="5%"/>
    </a-modal>
</template>
<script lang="ts" setup>
import { usePaginationRemote } from '@/hooks/usePagination'
import { EventSegItemType, IEventSegValueListParams, IEventSegListParams } from '@/api/model/events'
import { EVENT_DETAILS_COLUMNS } from '@/views/event/detail/constant'
import { getSegValueStsList, getSegStsList } from '@/api/request/event'
import { useApplicationStore } from '@/store/module/application'
import { exportFile } from '@/utils/export'

interface Props {
    period: string
    eventId: string
    segId: string
    dateList: Array<string>
}

const applicationStore = useApplicationStore()
const props = withDefaults(defineProps<Props>(), {
})
const {
    pagination,
    handlePaginationChange: handleTableChange
} = usePaginationRemote({ showSizeChanger: true, pageSize: 10, hideOnSinglePage: false })
const searchValue = ref<string>('')
const columns = EVENT_DETAILS_COLUMNS
const recordUserCount = ref<number>(0)
const recordMsgCount = ref<number>(0)
const modalVisable = ref<boolean>(false)
const eventSegTable = ref<Array<EventSegItemType>>([])
const tableLoading = ref<boolean>(false)

const seriesListEcharts = ref<Array<{ key: string; type: string; name: string; data: number[] }>>([
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

const handleOk = () => {
    modalVisable.value = false
}

const openModalClick = (record: EventSegItemType) => {
    const params: IEventSegValueListParams = {
        appId: applicationStore.currentApplicationID,
        xlxs: false,
        period: props.period,
        eventId: props.eventId,
        segId: props.segId,
        segValue: record.id,
    }
    getSegValueStsList(params).then(res => {
        recordUserCount.value = res.data.uv
        recordMsgCount.value = res.data.pv
        seriesListEcharts.value = seriesListEcharts.value.map(item => {
            let data = []
            if (item.key === 'uv') {
                data = res.data.list.map(item => item.uv)
            } else {
                data = res.data.list.map(item => item.pv)
            }
            return {
                ...item,
                data
            }
        })
    })
    modalVisable.value = true
}

const exportClick = () => {
    getTableData(true)
}

const searchClick = () => {
    getTableData()
}

const getTableData = (xlxs: boolean = false) => {
    !xlxs && (tableLoading.value = true)
    const params: IEventSegListParams = {
        appId: applicationStore.currentApplicationID,
        xlxs,
        period: props.period,
        eventId: props.eventId,
        segId: props.segId,
        key: searchValue.value,
        page: pagination.current,
        pageSize: pagination.pageSize
    }
    getSegStsList(params).then(res => {
        if (xlxs) {
            exportFile(res, '事件明细.xlsx')
        } else {
            eventSegTable.value = res?.data?.list || []
            pagination.total = res?.data?.count || 0
        }
    }).finally(() => {
        tableLoading.value = false
    })
}

watch([() => props.eventId, () => props.segId, () => props.period, () => pagination.current, () => pagination.pageSize], () => {
    getTableData()
})
</script>

<script lang="ts">
export default {
    name: 'EventDetailsTable'
}
</script>
<style lang="less" scoped>
.event-analysis-table {
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .search-input {
            width: 224px;
        }
    }
}
</style>