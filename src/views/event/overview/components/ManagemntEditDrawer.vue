<template>
    <a-drawer :title="drawerTitle" placement="right" :closable="false"
        v-model:visible="props.drawerVisible" width="640" @close="onClose">
        <div class="drawer-item">
            <div>事件ID</div>
            <a-input v-model:value="editRecord.eventId" disabled class="input" />
        </div>
        <div class="drawer-item">
            <div>显示名称</div>
            <a-input v-model:value="editRecord.eventName" disabled class="input" />
        </div>
        <a-tabs type="card" v-model:activeKey="tabActiveKey" @change="initData()">
            <a-tab-pane :key="EventStatusEnum.calculating" tab="计算中的指标参数"></a-tab-pane>
            <a-tab-pane :key="EventStatusEnum.pause" tab="暂停计算的指标参数"></a-tab-pane>
            <a-tab-pane :key="EventStatusEnum.unregistered" tab="未注册的指标参数"></a-tab-pane>
        </a-tabs>
        <a-table class="enter-y" :columns="columns" :pagination="pagination" :data-source="paramTable" row-key="segId"
            :loading="tableLoading">
            <template #segName="{ record }">
                <a-input v-model:value="record.segName" />
            </template>
            <template #operation="{ record }">
                <div class="flex">
                    <span class="pointer-span-14" @click="updateStatusClick(record)">{{ editText(record) }}</span>
                </div>
            </template>
        </a-table>
        <div class="bottom-div"></div>
        <div class="bottom-button">
            <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
            <a-button type="primary" @click="onConfirm" :loading="confirmLoading">保存</a-button>
        </div>
    </a-drawer>
</template>
<script lang="ts" setup>
import { usePaginationRemote } from '@/hooks/usePagination'
import { editEventSegEditBatch } from '@/api/request/event'
import { IInfoListData, ISegInfoListData } from '@/api/model/events'
import { MANAGEMENT_EDIT_COLUMNS } from '../constant'
import { useApplicationStore } from '@/store/module/application'
import { EventStatusEnum } from '@/enums/event'
import { useEventSegList } from '@/hooks/useEventSegList'

interface Props {
    editRecord: IInfoListData
    drawerVisible: boolean
    drawerTitle: string
}

const { getEventSegList } = useEventSegList()
const props = withDefaults(defineProps<Props>(), {})
const paramTable = ref<Array<ISegInfoListData>>([])
const tabActiveKey = ref<number>(EventStatusEnum.calculating)
const { pagination } = usePaginationRemote({ showSizeChanger: true, pageSize: 10, hideOnSinglePage: false })
const applicationStore = useApplicationStore()
const tableLoading = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const columns = MANAGEMENT_EDIT_COLUMNS

const editText = (record: ISegInfoListData) => {
    return record.segStatus === EventStatusEnum.calculating ? '暂停计算' : record.segStatus === EventStatusEnum.pause ? '还原' : '注册'
}

const emit = defineEmits(['setDrawerVisableEmit'])
const onClose = () => {
    emit('setDrawerVisableEmit', false)
}

const updateStatusClick = (record: ISegInfoListData) => {
    if (record.segStatus === EventStatusEnum.calculating) {
        record.segStatus = EventStatusEnum.pause
    } else {
        record.segStatus = EventStatusEnum.calculating
    }
}

const onConfirm = () => {
    confirmLoading.value = true
    const params = {
        appId: applicationStore.currentApplicationID,
        eventId: props.editRecord.eventId,
        list: paramTable.value.map(item => {
            return {
                segId: item.segId,
                segName: item.segName,
                segStatus: item.segStatus as number
            }
        })
    }
    editEventSegEditBatch(params).then(res => {
        res.success && (emit('setDrawerVisableEmit', false))
    }).finally(() => {
        confirmLoading.value = false
    })
}

const initData = () => {
    paramTable.value = []
    tableLoading.value = true
    getEventSegList(props.editRecord.eventId, tabActiveKey.value).then(res => {
        paramTable.value = res.map(item => {
            return {
                ...item,
                segStatus: tabActiveKey.value
            }
        })
        pagination.total = res.length
    }).finally(() => {
        tableLoading.value = false
    })
}

watch([() => props.drawerVisible], () => {
    if (props.drawerVisible) {
        tabActiveKey.value = EventStatusEnum.calculating
        initData()
    }
})

</script>
  
<script lang="ts">
export default {
    name: 'ManagemntEditDrawer'
}
</script>
<style lang="less" scoped>
.bottom-div {
    height: 40px;
    width: 0;
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

.drawer-item {
    display: flex;
    margin-bottom: 16px;
    align-items: center;

    div {
        min-width: 56px;
        white-space: nowrap;
        margin-right: 16px;
        color: #111111;
    }

    .input {
        width: 272px;
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