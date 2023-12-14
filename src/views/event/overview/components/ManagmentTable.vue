<template>
    <a-card class="enter-y !mt-4">
        <a-tabs v-model:activeKey="tabActiveKey" @change="tabsChnage">
            <a-tab-pane :key="EventStatusEnum.calculating" tab="计算中事件"></a-tab-pane>
            <a-tab-pane :key="EventStatusEnum.pause" tab="暂停计算事件"></a-tab-pane>
            <a-tab-pane :key="EventStatusEnum.unregistered" tab="未注册事件"></a-tab-pane>
        </a-tabs>
        <div class="mb-20">
            <a-button type="primary" :class="['ml-8']" :disabled="selectedRowKeys.length === 0"
                @click="batchOperationClick">{{ editTxt }}</a-button>
        </div>
        <a-table class="enter-y" :columns="tableColumns" :pagination="pagination" :data-source="paramTable"
            row-key="eventId" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :loading="tableLoading">
            <template #active="{ record }">
                <span :class="record.active ? 'effective' : 'inVain'">{{ record.active ? '有效' : '无效' }}</span>
            </template>
            <template #operation="{ record }">
                <div class="flex" v-if="tabActiveKey === EventStatusEnum.calculating">
                    <span class="pointer-span-14" @click="editClick(record)">编辑</span>
                    <div class="interval-vertical-global"></div>
                    <span class="pointer-span-14" @click="updateStausClick(record, EventStatusEnum.pause)">暂停计算</span>
                </div>
                <span v-if="tabActiveKey === EventStatusEnum.pause" class="pointer-span-14"
                    @click="updateStausClick(record, EventStatusEnum.calculating)">还原计算</span>
                <span v-if="tabActiveKey === EventStatusEnum.unregistered" class="pointer-span-14"
                    @click="updateStausClick(record, EventStatusEnum.calculating)">注册事件</span>
            </template>
        </a-table>
    </a-card>
    <ManagemntEditDrawer :edit-record="editRecord" :drawer-visible="drawerVisible"
        @setDrawerVisableEmit="setDrawerVisableEmit" :drawerTitle="drawerTitle"></ManagemntEditDrawer>
</template>
<script lang="ts" setup>
import { usePaginationRemote } from '@/hooks/usePagination'
import { editEventInfoBatch } from '@/api/request/event'
import { IInfoListData, BatchOperationType } from '@/api/model/events'
import { CALCULATING_EVENT, PAUSE_EVENT, UNREGISTERED_EVENT } from '../constant'
import { useApplicationStore } from '@/store/module/application'
import { EventStatusEnum } from '@/enums/event'
import ManagemntEditDrawer from './ManagemntEditDrawer.vue'
import { useEventList } from '@/hooks/useEventList'

const selectedRowKeys = ref<Array<string>>([])
const paramTable = ref<Array<IInfoListData>>([])
const tabActiveKey = ref<number>(EventStatusEnum.calculating)
const { getEventList } = useEventList(tabActiveKey.value)
const { pagination } = usePaginationRemote({ showSizeChanger: true, pageSize: 10, hideOnSinglePage: false })
const applicationStore = useApplicationStore()
// todo:any
const tableColumns = ref<any>(CALCULATING_EVENT)  // 计算中事件
const editTxt = ref<string>('批量暂停')
const tableLoading = ref<boolean>(false)
const drawerVisible = ref<boolean>(false)
const drawerTitle = ref<string>('计算中事件')
const editRecord = ref<IInfoListData>({
    eventId: '',
    eventName: '',
    eventDes: '',
    active: false
})

const setDrawerVisableEmit = (val: boolean) => {
    drawerVisible.value = val
}

const onSelectChange = (val: Array<string>) => {
    selectedRowKeys.value = val
}

const editClick = (recod: IInfoListData) => {
    editRecord.value = recod
    drawerVisible.value = true
}

const batchOperationClick = () => {
    let eventStatus = EventStatusEnum.calculating
    if (tabActiveKey.value === EventStatusEnum.calculating) {
        eventStatus = EventStatusEnum.pause
    }
    let list: Array<BatchOperationType> = []
    paramTable.value.map(item => {
        if (selectedRowKeys.value.includes(item.eventId)) {
            list.push({ eventId: item.eventId, eventStatus })
        }
        return item
    })
    batchEventInfo(list)
}

const updateStausClick = (editRecord: IInfoListData, eventStatus: number) => {
    const list = [{
        eventId: editRecord.eventId,
        eventName: editRecord.eventName,
        eventDes: editRecord.eventDes,
        eventStatus
    }]
    batchEventInfo(list)
}

const batchEventInfo = (list: Array<BatchOperationType>) => {
    const params = {
        appId: applicationStore.currentApplicationID,
        list
    }
    editEventInfoBatch(params).then(res => {
        res.success && initData()
    })
}

const tabsChnage = () => {
    if (tabActiveKey.value === EventStatusEnum.calculating) {
        tableColumns.value = CALCULATING_EVENT
        editTxt.value = '批量暂停'
        drawerTitle.value = '计算中事件'
    } else if (tabActiveKey.value === EventStatusEnum.pause) {
        tableColumns.value = PAUSE_EVENT
        editTxt.value = '批量还原'
        drawerTitle.value = '暂停计算事件'
    } else {
        tableColumns.value = UNREGISTERED_EVENT
        editTxt.value = '批量注册'
        drawerTitle.value = '未注册事件'
    }
    initData()
}

const initData = () => {
    selectedRowKeys.value = []
    tableLoading.value = true
    getEventList(tabActiveKey.value).then(res => {
        paramTable.value = res.map(item => {
            return {
                ...item,
                eventStatus: tabActiveKey.value
            }
        })
        pagination.total = res.length
    }).finally(() => {
        tableLoading.value = false
    })
}

watch([() => applicationStore.currentApplicationID], () => {
    initData()
})

onMounted(() => {
    initData()
})
</script>
  
<script lang="ts">
export default {
    name: 'ManagmentTable'
}
</script>
<style lang="less" scoped>
.effective {
    color: #00C896;
}

.inVain {
    color: #F53F3F;
}

.view-custom-overview {
    .footer {
        display: flex;
        justify-content: space-between;

        .event-button-parent {
            width: 112px;
            margin-bottom: 20px;

            .event-button {
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    font-size: 14px;
                    margin-left: 8px;
                }
            }
        }
    }
}
</style>