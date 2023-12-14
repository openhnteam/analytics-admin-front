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
  hasTitle?: boolean
  text?: string
  subtext?: string
  showXaxis?: boolean
  xSplitNumber?: number
  showYaxis?: boolean
  xData: Array<number | string>
  yData: Array<number | string>
  noDataMessage?: string
  lineColor?: string
  areaStartColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  hasTitle: false,
  text: '活跃趋势',
  subtext: '最近三十天',
  showXaxis: true,
  xSplitNumber: 4,
  noDataMessage: '暂无数据',
  showYaxis: false,
  xData: () => [],
  yData: () => [],
  lineColor: 'rgba(0,82,217,1)',
  areaStartColor: 'rgba(0,82,217,1)'
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
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: 'rgba(251, 146, 60, 0.8)'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: props.showYaxis,
      show: props.showXaxis,
      splitNumber: props.xSplitNumber,
      // offset: 50,
      data: props.xData,
      axisLine: {
        show: false
      }
    },
    yAxis: {
      show: props.showYaxis,
      type: 'value',
      max: 'dataMax',
      splitNumber: 4,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: '0%',
      right: props.showYaxis ? '0%' : '3%',
      top: 20,
      bottom: 20,
      containLabel: true
    },
    series: [
      {
        smooth: true,
        data: props.yData,
        type: 'line',
        lineStyle: {
          // 设置折线宽度为2
          width: 4
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: props.areaStartColor // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#fff' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
          // opacity: 0.5
        },
        itemStyle: {
          color: props.lineColor
        }
      }
    ]
  } as ECOption
  if (props.hasTitle) {
    option.title = {
      text: props.text,
      subtext: props.subtext,
      textStyle: {
        color: 'rgba(251,146,60, 0.7)',
        fontSize: 12
      },
      subtextStyle: {
        color: '#94a3b8',
        fontSize: 10
      }
    }
  }
  setOption(option)
}

watch([() => props.xData, () => props.yData], () => {
  init()
})

tryOnMounted(() => {
  init()
})
</script>
