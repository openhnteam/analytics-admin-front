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
  seriesList: Array<Partial<ECOption>>
  noDataMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  noDataMessage: '暂无数据',
  xData: () => [],
  seriesList: () => []
})

const showNoDataMessage = ref(false)

const colorList: Array<string> = [
  '#FFE7CE',
  '#C8F3E8'
]

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
    yAxis: {
      show: true,
      type: 'value',
      max: function (value) {
        return value.max + Math.ceil(value.max * 0.1)
      },
      splitLine: {
        lineStyle: {
          // 设置为虚线
          type: 'dashed'
        }
      },
      splitNumber: 1,
      axisTick: {
        show: false
      }
    },
    legend: {
      right: 30,
      top: 10,
      data: props.seriesList.map((s) => s.name),
      itemGap: 10,
      textStyle: {
        fontSize: 12,
        color: '#64748b'
      }
    },
    grid: { left: '0%', right: 20, top: 64, bottom: '0%', containLabel: true },
    series: props.seriesList.map((s, i) => ({
      ...s,
      // stack: 'Total',
      lineStyle: {
        width: 4,
        normal: {
          color: s?.key === 'today' ? '#FF8300' : '#00C896'
        }
      },
      smooth: true,
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

watch([() => props.seriesList], () => {
  init()
})

onMounted(() => {
  init()
})
</script>
<style scoped>
.test {
  color: rgba(147, 171, 211, 1);
}
</style>
