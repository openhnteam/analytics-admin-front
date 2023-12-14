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
  xData: Array<number | string>
  seriesList: Array<Partial<ECOption> & { yAxisName?: string }>
  noDataMessage?: string
  gridLeft?: string
  gridRight?: string
  multiYAxis?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  noDataMessage: '暂无数据',
  xData: () => [],
  seriesList: () => [],
  gridLeft: '3%',
  gridRight: '3%'
})

const colorList: Array<string> = ['#FF8300', '#00C896', '#0052D9']

const showNoDataMessage = ref(false)

const init = () => {
  if (!props.xData.length || !props.seriesList.length) {
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
      boundaryGap: false,
      show: true,
      splitNumber: 4,
      data: props.xData,
      axisLine: {
        show: false
      }
    },
    yAxis: props.multiYAxis
      ? props.seriesList?.map((it) => ({
        type: 'value',
        name: it?.yAxisName,
        max:
          props.gridRight === '4%'
            ? function (value) {
              return value.max + Math.ceil(value.max * 0.1)
            }
            : 'dataMax',
        axisTick: {
          show: false
        }
      }))
      : {
        show: true,
        type: 'value',
        max:
          props.gridRight === '4%'
            ? function (value) {
              return value.max + Math.ceil(value.max * 0.1)
            }
            : 'dataMax',
        splitNumber: 4,
        axisTick: {
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
    grid: { left: props.gridLeft, right: props.gridRight, top: '10%', bottom: '5%', containLabel: true },
    series: props.seriesList.map((s, i) => ({
      ...s,
      smooth: true,
      // stack: 'Total',
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
              color: colorList[i]
            },
            {
              offset: 0.9,
              color: '#fff'
            }
          ],
          global: false // 缺省为 false
        }
      },
      itemStyle: {
        color: colorList[i]
      }
    }))
  } as ECOption
  setOption(option)
}

watch(
  [() => props.seriesList],
  () => {
    init()
  },
  { deep: true }
)

onMounted(() => {
  init()
})
</script>
