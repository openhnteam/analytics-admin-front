<template>
  <div ref="chartRef" :style="{ width: props.width, height: props.height }">
    <div v-if="showNoDataMessage" class="text-center h-20 leading-20">{{ props.noDataMessage }}</div>
  </div>
</template>
<script lang="ts" setup>
import { useECharts } from '@/hooks/useECharts'
import type { Ref } from 'vue'
import { ECOption } from '@/utils/echarts'
import { colorList } from '@/enums/theme'

const chartRef = ref<Nullable<HTMLDivElement>>(null)
const { setOption } = useECharts(chartRef as Ref<HTMLDivElement>)

interface Props {
  width?: number | string
  height?: number | string
  xData: Array<number | string>
  yData?: Array<number | string>
  seriesList?: Array<Partial<ECOption>>
  noDataMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  noDataMessage: '暂无趋势数据',
  xData: () => [],
  yData: () => []
})

const showNoDataMessage = ref(false)

const init = () => {
  if (!props.xData.length || (!props.yData.length && !props.seriesList?.length)) {
    showNoDataMessage.value = true
    return
  }
  let series: Array<Partial<ECOption>> = []

  if (props.seriesList?.length) {
    series = props.seriesList.map((s, i) => ({
      ...s,
      ...{
        smooth: true,
        type: 'line',
        showSymbol: false,
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
                color: colorList[i].replace('1)', '0.8)')
              },
              {
                offset: 0.8,
                color: colorList[i].replace('1)', '0)')
              }
            ],
            global: false // 缺省为 false
          }
          // opacity: 0.5
        },
        itemStyle: {
          color: colorList[i]
        }
      }
    }))
  } else {
    series = [
      {
        smooth: true,
        data: props.yData,
        type: 'line',
        showSymbol: false,
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
                color: colorList[0].replace('1)', '0.8)')
              },
              {
                offset: 0.8,
                color: colorList[0].replace('1)', '0)')
              }
            ],
            global: false // 缺省为 false
          }
          // opacity: 0.5
        },
        itemStyle: {
          color: colorList[0]
        }
      }
    ]
  }

  const option = {
    /* tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: 'rgba(251, 146, 60, 0.8)'
        }
      }
    }, */
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false,
      // offset: 50,
      data: props.xData,
      axisLine: {
        show: false
      }
    },
    yAxis: {
      show: false,
      type: 'value',
      max: 'dataMax',
      splitNumber: 4,
      axisTick: {
        show: false
      }
    },
    grid: { left: '0%', right: '0%', top: '0%', bottom: '0%', containLabel: false },
    series: series
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
