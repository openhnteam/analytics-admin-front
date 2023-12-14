<template>
    <a-card class="enter-y !mt-4">
        <div class="footer">
            <div class="event-button-parent">
                <a-button type="primary" block @click="goManagmentClick">
                    <template #icon>
                        <div class="event-button">
                            <svg t="1699413010232" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="37550" width="16" height="16">
                                <path
                                    d="M885.333333 128H266.666667c-17.706667 0-32 14.293333-32 32v138.666667H117.333333c-17.706667 0-32 14.293333-32 32v533.333333c0 17.706667 14.293333 32 32 32h768c17.706667 0 32-14.293333 32-32v-704c0-17.706667-14.293333-32-32-32zM149.333333 362.666667h85.333334v469.333333h-85.333334V362.666667z m704 469.333333H298.666667v-640h554.666666v640z"
                                    p-id="37551" fill="#ffffff"></path>
                                <path
                                    d="M693.333333 362.666667H416a32 32 0 1 1 0-64h277.333333a32 32 0 1 1 0 64zM693.333333 533.333333H416a32 32 0 1 1 0-64h277.333333a32 32 0 1 1 0 64zM693.333333 725.333333H416a32 32 0 1 1 0-64h277.333333a32 32 0 1 1 0 64z"
                                    p-id="37552" fill="#ffffff"></path>
                            </svg>
                            <span>事件管理</span>
                        </div>
                    </template>
                </a-button>
            </div>
            <a-radio-group v-model:value="radioVal" button-style="solid" @change="radioChange">
                <a-radio-button value="today">今日</a-radio-button>
                <a-radio-button value="yesterday">昨日</a-radio-button>
                <a-radio-button value="avg7Days">7日</a-radio-button>
                <a-radio-button value="avg30Days">30日</a-radio-button>
            </a-radio-group>
        </div>
        <a-table class="enter-y" :columns="columns" :pagination="pagination" :data-source="eventList" row-key="eventId"
            @change="handleTableChange" :loading="tableLoading">
            <template #uv="{ record }">{{ record.uv?.toLocaleString() || record.uv }}</template>
            <template #pv="{ record }">{{ record.pv?.toLocaleString() || record.uv }}</template>
            <template #operation="{ record }">
                <span class="pointer-span-14" @click="openDrawer(record)">编辑</span>
            </template>
        </a-table>
    </a-card>
    <a-drawer title="Basic Drawer" placement="right" :closable="false" v-model:visible="drawerVisible" width="384">
        <div class="drawer-item">
            <div>事件KEY</div>
            <a-input v-model:value="editEventId" disabled />
        </div>
        <div class="drawer-item">
            <div>事件名称</div>
            <a-textarea v-model:value="editEventName" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </div>
        <div class="drawer-item">
            <div>事件描述</div>
            <a-textarea v-model:value="editEventDes" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </div>
        <div class="bottom-button">
            <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
            <a-button type="primary" @click="onConfirm" :loading="confirmLoading">确定</a-button>
        </div>
    </a-drawer>
</template>
<script lang="ts" setup>
import { useMoment } from '@/hooks/useMoment'
import { usePaginationRemote, Pagination } from '@/hooks/usePagination'
import { EVENT_OVERVIEW_COLUMNS } from '../constant'
import { getStsList, editEventInfoBatch } from '@/api/request/event'
import { useApplicationStore } from '@/store/module/application'
import { IInfoListData, IEventStsListData } from '@/api/model/events'
import { useEventList } from '@/hooks/useEventList'

const radioVal = ref<string>('today')
const { eventList: hookEventList, getEventList } = useEventList()
const eventList = ref<Array<IInfoListData & Partial<IEventStsListData>>>([])
const { pagination } = usePaginationRemote({ showSizeChanger: true, pageSize: 10, hideOnSinglePage: false })
const columns = EVENT_OVERVIEW_COLUMNS
const applicationStore = useApplicationStore()
const drawerVisible = ref<boolean>(false)
const editEventId = ref<string>('')
const editEventName = ref<string>('')
const editEventDes = ref<string>('')
const tableLoading = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)

const radioChange = (val: string) => {
    getDetailsData()
}

const handleTableChange = (val: Pagination) => {
    pagination.current = val.current;
    pagination.pageSize = val.pageSize;
}

const openDrawer = (record: IInfoListData & Partial<IEventStsListData>) => {
    editEventId.value = record.eventId
    editEventName.value = record.eventName
    editEventDes.value = record.eventDes
    drawerVisible.value = true
}

const emit = defineEmits(["showManagmentEmit"])
const goManagmentClick = () => {
    emit("showManagmentEmit", true)
}

const onClose = () => {
    drawerVisible.value = false
}

const onConfirm = () => {
    confirmLoading.value = true
    const params = {
        appId: applicationStore.currentApplicationID,
        list: [{
            eventId: editEventId.value,
            eventName: editEventName.value,
            eventDes: editEventDes.value,
        }]

    }
    editEventInfoBatch(params).then(res => {
        if (res.success) {
            getEventList()
            onClose()
        }
    }).finally(() => {
        confirmLoading.value = false
    })
}

const getDetailsData = () => {
    tableLoading.value = true
    // useMoment(1, 1) 昨日  useMoment(0, 0) 今日   useMoment(7, 1) 7日  useMoment(30, 1) 30日
    let start, end = 0
    switch (radioVal.value) {
        case 'yesterday':
            start = 1;
            end = 1;
            break;
        case 'avg7Days':
            start = 7;
            end = 1;
            break;
        case 'avg30Days':
            start = 30;
            end = 1;
            break;
        default:
            break;
    }
    const { timestampList } = useMoment(start, end)
    const eventIds = eventList.value.map(item => item.eventId)
    getStsList({ appId: applicationStore.currentApplicationID, period: JSON.stringify(timestampList.value), eventIds }).then(res => {
        eventList.value = eventList.value.map(item => {
            const data = res.data.find(child => child.eventId === item.eventId)
            return {
                ...item,
                eventDes: item?.eventDes || '--',
                eventName: item?.eventName || '--',
                pv: data?.pv || 0,
                uv: data?.uv || 0,
            }
        })
    }).finally(() => {
        tableLoading.value = false
    })
}

watch([() => hookEventList.value], () => {
    pagination.total = hookEventList.value.length
    eventList.value = hookEventList.value
    if (pagination.total > 0) {
        getDetailsData()
    }
}, { deep: true, immediate: true })
</script>
  
<script lang="ts">
export default {
    name: 'OverviewTable'
}
</script>
<style lang="less" scoped>
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

.drawer-item {
    display: flex;
    margin-bottom: 16px;
    // align-items: center;

    div {
        min-width: 56px;
        white-space: nowrap;
        margin-right: 16px;
    }
}

.bottom-button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;
    z-index: 1;
}
</style>