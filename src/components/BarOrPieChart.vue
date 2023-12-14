<template>
  <div ref="chartRef" :style="{ width: props.width, height: `${height}px` }">
    <div v-if="showNoDataMessage" class="text-center h-20 leading-20">{{ props.noDataMessage }}</div>
  </div>
</template>
<script lang="ts" setup>
import { useECharts } from '@/hooks/useECharts'
import type { Ref } from 'vue'
import { ECOption } from '@/utils/echarts'
import clonedeep from 'lodash.clonedeep'

const chartRef = ref<Nullable<HTMLDivElement>>(null)
const { setOption, clearEChart } = useECharts(chartRef as Ref<HTMLDivElement>)

interface Props {
  width?: number | string
  height?: number | string
  catalogKey: string
  sortKey: string
  data: Array<Record<string, number | string>>
  noDataMessage?: string
  text?: string
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 10,
  data: () => [],
  noDataMessage: '暂无数据'
})

const showNoDataMessage = ref(false)
import { colorList } from '@/enums/theme'

const DEFAULT_HEIGHT = 280
const height = ref(DEFAULT_HEIGHT)

const getSortedListByKey = (list: Array<Record<string, number | string>>, key: string) =>
  clonedeep(list).sort(({ [key]: a }, { [key]: b }) => (b as number) - (a as number))

const init = () => {
  if (!props.catalogKey || !props.sortKey || !props.data.length) {
    showNoDataMessage.value = true
    clearEChart()
    return
  }
  showNoDataMessage.value = false
  let option: ECOption
  const limitedList = getSortedListByKey(props.data, props.sortKey).slice(0, props.max)
  if (props.data.length > props.max) {
    height.value = props.max * 30 + 32
    option = {
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
          lineStyle: {
            width: 1,
            color: 'rgba(251, 146, 60, 0.8)'
          }
        }
      },
      title: {
        text: props.text,
        textStyle: {
          color: colorList[0],
          fontSize: 16,
          fontWeight: 'normal'
        },
        left: 'center',
        top: 'top'
      },
      color: colorList,
      xAxis: {
        type: 'value',
        max: (limitedList[0][props.sortKey] as number) * 1.1,
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: { show: false }
        // data: limitedList.map((item) => item[props.sortKey])
      },
      yAxis: {
        type: 'category',
        data: limitedList.map((item) => item[props.catalogKey]),
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: { show: false },
        axisPointer: { show: false },
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: props.max // only the largest 3 bars will be displayed
      },
      grid: { left: '0%', right: '0%', top: 36, bottom: '0%', height: height.value - 10, containLabel: true },
      series: [
        {
          // realtimeSort: true,
          name: props.text,
          colorBy: 'data',
          type: 'bar',
          data: limitedList.map((item) => item[props.sortKey]),
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
                    color: colorList[params.dataIndex]?.replace('1)', '0.4)')
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex]?.replace('1)', '0.9)')
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          label: {
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
        }
      ],
      animationEasing: 'elasticOut',
      animationEasingUpdate: 'linear'
    }
  } else {
    const count = limitedList.reduce((acc, cur) => acc + (cur[props.sortKey] as number), 0)
    option = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: props.text,
        textStyle: {
          color: colorList[0],
          fontSize: 14,
          fontWeight: 'normal'
        },
        left: 'center',
        top: 'center'
      },
      grid: { left: '0%', right: '0%', top: 20, bottom: 20, height: height.value - 40, containLabel: true },
      series: [
        {
          type: 'pie',
          radius: [40, 120],
          center: ['50%', '50%'],
          roseType: 'radius',
          startAngle: 180,
          data: limitedList.map((item) => ({
            value: item[props.sortKey] as number,
            name:
              `${item[props.catalogKey] ? (item[props.catalogKey] as string) : 'unknown'}` +
              ' - ' +
              `${item[props.sortKey] ? (((item[props.sortKey] as number) / count) * 100).toFixed(2) : 0}` +
              '%'
          })),
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
    }
  }
  setOption(option)
}

watch([() => props.data], () => {
  init()
})

tryOnMounted(() => {
  init()
})
</script>
