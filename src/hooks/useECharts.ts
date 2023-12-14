import type { Ref } from 'vue'
import echarts, { ECOption } from '@/utils/echarts'
import { useEventListener, tryOnUnmounted, useTimeoutFn } from '@vueuse/core'

export function useECharts(elRef: Ref<HTMLDivElement>) {
  let echartInstance: Nullable<echarts.ECharts> = null
  let removeResizeEvent: Function = () => {}

  const initEChart = () => {
    const el = unref(elRef)
    if (!el) {
      throw new Error('html element which echart try to bind not found.')
    }
    echartInstance = echarts.init(el, 'lightEChartsTheme', { renderer: 'svg' })

    removeResizeEvent = useEventListener(window, 'resize', resize)
  }

  tryOnUnmounted(() => {
    if (echartInstance) {
      removeResizeEvent()
      echartInstance.dispose()
      echartInstance = null
    }
  })

  const getEChartInstance = (): Nullable<echarts.ECharts> => {
    return echartInstance
  }

  const resize = (): void => {
    echartInstance?.resize()
  }

  const setOption = (options: ECOption) => {
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOption(unref(options))
      }, 50)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!echartInstance) {
          initEChart()
        }
        echartInstance?.clear()
        echartInstance?.setOption(unref(options))
      }, 50)
    })
  }

  const clearEChart = () => {
    echartInstance?.clear()
  }

  return {
    echarts,
    resize,
    removeResizeEvent,
    getEChartInstance,
    setOption,
    clearEChart
  }
}
