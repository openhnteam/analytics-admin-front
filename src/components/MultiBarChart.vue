<template>
  <div ref="chartRef" :style="`height: ${height}px`">
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
  automate?: boolean
  forceHorizontal?: boolean
  xData: Array<number | string>
  seriesList: Array<Partial<ECOption> & { data: number[] }>
  noDataMessage?: string
}

const DEFAULT_HEIGHT = 320
const height = ref(DEFAULT_HEIGHT)

const props = withDefaults(defineProps<Props>(), {
  noDataMessage: '暂无数据',
  automate: false,
  forceHorizontal: false,
  xData: () => [],
  seriesList: () => []
})

const showNoDataMessage = ref(false)
const colorList = ['rgba(0,82,217,1)', 'rgba(109, 220, 207, 1)', 'rgba(147, 171, 211, 1)']
function getBaseLog(x: number, y: number): number {
  return Math.log(y) / Math.log(x)
}

const init = () => {
  if (!props.xData.length || !props.seriesList.length) {
    showNoDataMessage.value = true
    clearEChart()
    return
  }
  showNoDataMessage.value = false

  let isVertical = true
  let isPrecise = false
  if (props.automate) {
    let allNum = props.seriesList
      .map(({ data }) => data)
      .flat()
      .sort((a, b) => a - b)
    isVertical = !props.forceHorizontal && allNum.length / props.seriesList.length < 10
    allNum = allNum.filter((n) => n > 0)
    const min = allNum[0]
    const max = allNum[allNum.length - 1]
    isPrecise = min > 1 && getBaseLog(10, max) - getBaseLog(10, min) >= 2
    console.log('isVertical', isVertical)
    console.log('isPrecise', isPrecise)
    if (!isVertical) {
      height.value = (allNum.length / 2) * 36 + 100
    } else {
      height.value = DEFAULT_HEIGHT
    }
  } else {
    height.value = DEFAULT_HEIGHT
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        lineStyle: {
          width: 1,
          color: 'rgba(251, 146, 60, 0.8)'
        }
      }
    },
    xAxis: isVertical
      ? {
          type: 'category',
          show: true,
          data: props.xData,
          axisLine: {
            show: false
          }
        }
      : isPrecise
      ? {
          type: 'log',
          logBase: 10,
          interval: 1,
          axisTick: {
            show: false
          }
        }
      : {
          type: 'value',
          max: 'dataMax',
          min: 0,
          minInterval: 1,
          splitNumber: 4,
          axisTick: {
            show: false
          }
        },
    yAxis: isVertical
      ? isPrecise
        ? {
            type: 'log',
            logBase: 10,
            interval: 1,
            axisTick: {
              show: false
            }
          }
        : {
            show: true,
            type: 'value',
            max: 'dataMax',
            min: 0,
            minInterval: 1,
            splitNumber: 4,
            axisTick: {
              show: false
            }
          }
      : {
          type: 'category',
          show: true,
          data: props.xData,
          axisLine: {
            show: false
          }
        },
    legend: {
      data: props.seriesList.map((s) => s.name),
      itemGap: 20,
      textStyle: {
        fontSize: 16,
        color: '#64748b'
      }
    },
    grid: { left: '0%', right: '5%', top: '40', bottom: '0%', containLabel: true },
    series: props.seriesList.map((s, i) => ({
      ...s,
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: isVertical ? 0 : 1,
          y: 0,
          x2: 0,
          y2: isVertical ? 1 : 0,
          colorStops: [
            {
              offset: 0,
              color: colorList[i].replace('1)', '0.5)')
            },
            {
              offset: 1,
              color: colorList[i].replace('1)', '1)')
            }
          ],
          global: false // 缺省为 false
        }
      },
      label: isVertical
        ? {
            show: false
          }
        : {
            show: true,
            color: '#b7c0ce',
            align: 'left',
            position: 'right',
            formatter: '{c}',
            valueAnimation: true
          },
      emphasis: {
        focus: 'series'
      }
    }))
  } as ECOption
  if (props.forceHorizontal) {
    Object.assign(option, {
      [isVertical ? 'yAxis' : 'xAxis']: {
        axisLabel: { show: false },
        splitLine: { show: false }
      }
    })
  }
  // console.log('option', option)
  setTimeout(() => {
    setOption(option)
  }, 50)
}

watch([() => props.seriesList], () => {
  init()
})

onMounted(() => {
  init()
})
</script>
