<template>
  <a-range-picker dropdownClassName="range-picker-class" :value="props.value"
    :ranges="props.ranges" :format="props.format" :show-time="false" :allow-clear="false"
    :disabled-date="checkDisableDate" @change="onRangeChange" />
</template>
<script lang="ts" setup>
import moment, { Moment } from 'moment'
import type { RangePickerValue } from 'ant-design-vue/es/date-picker/props'
import { getDefaultPeriod, getPeriod } from '@/utils/moment'
import { FORMAT_DAY } from '@/enums/moment'

interface Props {
  format?: string
  ranges?: any
  value: [Moment, Moment],
  startDisableDate?: number
  today?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  format: FORMAT_DAY,
  ranges: () =>
  ({
    昨天: getPeriod(1, 1),
    过去7天: getPeriod(7, 1),
    过去30天: getPeriod(30, 1),
    过去60天: getPeriod(60, 1),
    过去90天: getPeriod(90, 1),
    过去120天: getPeriod(120, 1)
  } as unknown as RangePickerValue),
  value: () => getDefaultPeriod(),
  today: false
})

const checkDisableDate = (current: Moment) => {
  const currentData = current.endOf('day').valueOf()
  if (props.startDisableDate && currentData < props.startDisableDate) {
    return true
  }
  return !props.today
    ? currentData >= moment().endOf('day').valueOf()
    : currentData > moment().endOf('day').valueOf()
}
const emit = defineEmits(['update:value'])
const onRangeChange = (dates: RangePickerValue) => {
  emit('update:value', dates)
}
</script>
<style lang="less" scoped>
// :deep(.ant-calendar-picker-container) {
//   top: 35px !important;
//   z-index: 1000;
// }
</style>
