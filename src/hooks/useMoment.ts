import moment from 'moment'
import { getPeriod, getDefaultPeriod, getTimestampList } from '@/utils/moment'
import { FORMAT_DAY } from '@/enums/moment'
export const useMoment = (start?: number, end?: number, type: moment.unitOfTime.DurationConstructor = 'days') => {
  const period = ref(getDefaultPeriod())
  if (typeof start == 'number' && typeof end == 'number') {
    period.value = getPeriod(start, end, type)
  }

  const dateList = computed(() => {
    const start = moment(unref(period.value[0]))
    const end = moment(unref(period.value[1]))

    const rtn = []
    while (!end.isBefore(start)) {
      rtn.unshift(end.format(FORMAT_DAY))
      end.subtract(1, 'days')
    }
    return rtn
  })

  const timestampList = computed(() => {
    return getTimestampList(period.value)
  })
  const timestampMinutesList = computed(() => {
    return getTimestampList(period.value, 'minutes')
  })
  const getRawPeriod = () => {
    return toRaw(period)
  }

  const startDateFormat = computed(() => period.value[0].format(FORMAT_DAY))
  const endDateFormat = computed(() => period.value[1].format(FORMAT_DAY))
  const periodFormat = computed(() =>
    startDateFormat.value === endDateFormat.value
      ? startDateFormat.value
      : `${startDateFormat.value} 至 ${endDateFormat.value}`
  )

  return {
    period,
    dateList,
    timestampList,
    timestampMinutesList,
    getTimestampList,
    getRawPeriod,
    startDateFormat,
    endDateFormat,
    periodFormat
  }
}
