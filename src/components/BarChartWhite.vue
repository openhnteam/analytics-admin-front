<template>
  <div ref="chartRef" :style="{ width: props.width, height: props.height }">
    <div v-if="showNoDataMessage" class="text-center h-20 leading-20">{{ props.noDataMessage }}</div>
  </div>
</template>
<script lang="ts" setup>
import { useECharts } from '@/hooks/useECharts'
import type { Ref } from 'vue'
import { ECOption } from '@/utils/echarts'

const chartRef = ref<Nullable<HTMLDivElement>>(null)
const { setOption, clearEChart } = useECharts(chartRef as Ref<HTMLDivElement>)

interface Props {
  width?: number | string
  height?: number | string
  xData: Array<{ value: number; name: string }> | Array<number | string>
  yData: Array<number | string>
  noDataMessage?: string
  max?: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 2,
  xData: () => [],
  yData: () => [],
  noDataMessage: '暂无数据'
})

const showNoDataMessage = ref(false)

const init = () => {
  if (!props.xData.length || !props.yData.length) {
    showNoDataMessage.value = true
    clearEChart()
    return
  }
  showNoDataMessage.value = false
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${props.xData[params.dataIndex]}` + '</br>' + `${props.title} ${params.value}`
      }
    },
    color: '#0052D9',
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: { show: false },
      axisTick: { show: false },
      axisPointer: { show: false },
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    grid: { left: '0%', right: '0%', top: '30%', bottom: '0%', containLabel: true },
    series: [
      {
        // colorBy: 'data',
        type: 'bar',
        data: props.yData,
        // barWidth: '10px',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        label: {
          show: false
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationEasingUpdate: 'linear'
  } as ECOption

  setOption(option)
}

watch([() => props.xData, () => props.yData], () => {
  init()
})

tryOnMounted(() => {
  init()
})
</script>
