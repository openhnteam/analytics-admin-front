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

import { colorList } from '@/enums/theme'

interface Props {
  width?: number | string
  height?: number | string
  text?: string
  seriesData: Array<{ value: number; name: string }>
  noDataMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  seriesData: () => [],
  noDataMessage: '暂无数据'
})

const showNoDataMessage = ref(false)

const init = () => {
  if (!props.seriesData.length) {
    showNoDataMessage.value = true
    clearEChart()
    return
  }
  showNoDataMessage.value = false
  const option = {
    tooltip: {
      trigger: 'item'
    },
    /* toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    }, */
    /* color: [
        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ], */
    series: [
      {
        // name: 'Nightingale Chart',
        type: 'pie',
        radius: [40, 120],
        center: ['50%', '50%'],
        roseType: 'radius',
        startAngle: 180,
        data: props.seriesData,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200
        },
        itemStyle: {
          color: (params) => {
            return colorList[params.dataIndex % 10].replace('1)', `${1 - params.dataIndex / 13})`)
          }
        }
      }
    ]
  } as ECOption
  if (props.text) {
    option.title = {
      text: props.text,
      textStyle: {
        color: 'rgba(0,82,217,1)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      left: 'center',
      top: 'center'
    }
  }
  setOption(option)
}

watch([() => props.seriesData], () => {
  init()
})

tryOnMounted(() => {
  init()
})
</script>
