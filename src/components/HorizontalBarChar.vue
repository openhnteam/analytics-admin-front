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
  color?: string
  width?: number | string
  height?: number | string
  xData: Array<{ value: number; name: string; label?: string }>
  yData: Array<number | string>
  noDataMessage?: string
  max?: number
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
    title: {
      show: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: 0,
      right: 5,
      top: 0,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false, // 设置不展示 y 轴
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: props.yData,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        // name: '2011',
        type: 'bar',
        data: props.xData,
        itemStyle: {
          // 设置柱形颜色为红色
          color: props?.color
        },
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
          // 自定义标签文字
          formatter: function (params) {
            return params.data.label ?? params.value
          }
        }
      }
    ]
  } as ECOption
  setOption(option)
}

watch(
  [() => props.xData, () => props.yData],
  () => {
    init()
  },
  { deep: true }
)

tryOnMounted(() => {
  init()
})
</script>
