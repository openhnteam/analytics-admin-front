<template>
    <common-page class="view-analytics-app-user">
        <template #headerTitle>
            应用统计数据概览
        </template>
        <template #default>
            <a-card>
                <div class="overview-data">
                    <div class="data-item"
                        style="background:linear-gradient(90deg, rgba(225,237,254,1) 0%,rgba(225,237,254,0.4) 100%);">
                        <div class="title">新增用户（7日平均）</div>
                        <div class="num">{{ overviewData?.avg7DaysNewUv?.toLocaleString() || 0 }}</div>
                        <img class="data-img" src="@/assets/images/overview/one.png" />
                    </div>
                    <div class="data-item"
                        style="background: linear-gradient(90deg, rgba(255,246,235,1) 0%,rgba(255,247,238,0.7) 100%);">
                        <div class="title">活跃用户（7日平均）</div>
                        <div class="num">{{ overviewData?.avg7DaysUv?.toLocaleString() || 0 }}</div>
                        <img class="data-img" src="@/assets/images/overview/two.png" />
                    </div>
                    <div class="data-item"
                        style="background: linear-gradient(90deg, rgba(255,241,237,1) 0%,rgba(255,245,245,0.7) 100%);">
                        <div class="title">使用时长（7日平均）</div>
                        <div class="num">{{ detailMin(overviewData?.avg7DaysDuration || 0) }}</div>
                        <img class="data-img" src="@/assets/images/overview/three.png" />
                    </div>
                    <div class="data-item"
                        style="background: linear-gradient(90deg, rgba(234,252,243,1) 0%,rgba(234,250,242,0.4) 100%);">
                        <div class="title">活跃用户总数（7日平均）</div>
                        <div class="num">{{ overviewData?.last7DaysUv?.toLocaleString() || 0 }}</div>
                        <img class="data-img" src="@/assets/images/overview/four.png" />
                    </div>
                    <div class="data-item"
                        style="background: linear-gradient(90deg, rgba(225,237,254,1) 0%,rgba(225,237,254,0.4) 100%);">
                        <div class="title">活跃用户总数（近30日）</div>
                        <div class="num">{{ overviewData?.last30DaysUv?.toLocaleString() || 0 }}</div>
                        <img class="data-img" src="@/assets/images/overview/five.png" />
                    </div>
                    <div class="data-item"
                        style="background: linear-gradient(90deg, rgba(242,237,253,1) 0%,rgba(242,237,253,0.4) 100%);">
                        <div class="title">累计用户数</div>
                        <div class="num">{{ overviewData?.totalUv?.toLocaleString() || 0 }}</div>
                        <img class="data-img" src="@/assets/images/overview/six.png" />
                    </div>
                </div>
            </a-card>
            <a-card class="tab-echarts">
                <a-tabs v-model:activeKey="activeKey" @change="tabChange">
                    <a-tab-pane key="newUser" tab="新增用户"></a-tab-pane>
                    <a-tab-pane key="activeUser" tab="活跃用户"></a-tab-pane>
                    <a-tab-pane key="startNum" tab="启动次数"></a-tab-pane>
                    <a-tab-pane key="allUser" tab="累计用户"></a-tab-pane>
                </a-tabs>
                <div class="w-full h-96 mt-4">
                    <line-chart :has-title="false" :show-yaxis="true" :show-xaxis="true" class="w-full h-96"
                        :lineColor="'#0052D9'" :area-start-color="'#729FEA'" :x-data="dateList" :y-data="yData"
                        no-data-message="暂无数据" />
                </div>
                <div class="range-picker-content">
                    <range-picker v-model:value="period" format="YYYY-MM-DD HH:mm" :show-time="{ format: 'HH:mm' }"
                        @ok="onRangeChange" />
                </div>
            </a-card>
        </template>
    </common-page>
</template>
<script lang="ts" setup>
import { useMoment } from '@/hooks/useMoment'
import { getDashboardTrendline, getDashboardHome } from '@/api/request'
import { useApplicationStore } from '@/store/module/application'
import { TrendlineItemType, OverviewDataType } from '@/api/model'

const applicationStore = useApplicationStore()

const { period, dateList, timestampList } = useMoment()
const activeKey = ref<string>('newUser')
const yData = ref<Array<number | string>>([])
const allList = ref<Array<TrendlineItemType>>([])
const overviewData = ref<OverviewDataType>()

const detailMin = (val: number) => {
    if (val === 0) {
        return '--'
    }
    const minutes = Math.floor(val / 60);
    const remainingSeconds = val % 60;
    return minutes + "分" + remainingSeconds + "秒"
}

const getEchartsData = () => {
    if (applicationStore.currentApplicationID === '') {
        return
    }
    getDashboardTrendline({ appId: applicationStore.currentApplicationID, period: JSON.stringify(timestampList.value) }).then(res => {
        allList.value = res?.data || []
        tabChange()
    })
}

const getHomeData = () => {
    if (applicationStore.currentApplicationID === '') {
        return
    }
    getDashboardHome({ appId: applicationStore.currentApplicationID }).then(res => {
        overviewData.value = res?.data || {}
    })
}

const onRangeChange = () => {
    getEchartsData()
}

const tabChange = () => {
    switch (activeKey.value) {
        case 'newUser':
            yData.value = allList.value?.map(item => item.newUv) || []
            break;
        case 'activeUser':
            yData.value = allList.value?.map(item => item.uv) || []
            break;
        case 'startNum':
            yData.value = allList.value?.map(item => item.pv) || []
            break;
        case 'allUser':
            yData.value = allList.value?.map(item => item.totalUv) || []
            break;
        default:
            break;
    }
}

watch([() => applicationStore.currentApplicationID], () => {
    getEchartsData()
    getHomeData()
})

onMounted(() => {
    getEchartsData()
    getHomeData()
})
</script>

<script lang="ts">
export default {
    name: 'AnalyticsOverview'
}
</script>
<style lang="less" scoped>
.overview-data {
    display: flex;
    justify-content: space-around;

    .data-item {
        flex: 1;
        height: 6.5rem;
        padding: 20px 16px;
        position: relative;
        border-radius: 4px;
        margin-right: 16px;

        .title {
            color: #111111;
            height: 22px;
            margin-bottom: 8px;
        }

        .num {
            height: 32px;
            font-size: 24px;
            font-weight: 600;
            color: #111111;
        }

        .data-img {
            width: 64px;
            height: 64px;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
}

.tab-echarts {
    margin-top: 20px;
    position: relative;

    .range-picker-content {
        position: absolute;
        top: 20px;
        right: 20px;
    }
}
</style>