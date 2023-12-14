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
  xData: Array<{ value: number; name: string }>
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
import { colorList } from '@/enums/theme'

const init = () => {
  if (!props.xData.length || !props.yData.length) {
    showNoDataMessage.value = true
    clearEChart()
    return
  }
  showNoDataMessage.value = false
  const option = {
    tooltip: {
      trigger: 'item'
    },
    color: colorList,
    xAxis: {
      type: 'value',
      max: 'dataMax',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: { show: false }
      // data: props.xData,
    },
    yAxis: {
      type: 'category',
      data: props.yData,
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: { show: false },
      axisPointer: { show: false },
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: props.max
    },
    grid: { left: '0%', right: '0%', top: '0%', bottom: '0%', containLabel: true },
    series: [
      {
        colorBy: 'data',
        type: 'bar',
        data: props.xData,
        showBackground: true,
        backgroundStyle: {
          color: 'rgb(237, 239, 244)'
        },
        itemStyle: {
          color: (params) => {
            return {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: colorList[params.dataIndex]?.replace('1)', '0.3)')
                },
                {
                  offset: 1,
                  color: colorList[params.dataIndex]?.replace('1)', '0.7)')
                }
              ],
              global: false // 缺省为 false
            }
          }
        },
        label: {
          show: true,
          color: '#64748b',
          align: 'left',
          position: 'insideLeft',
          formatter: '{b}',
          valueAnimation: true
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
