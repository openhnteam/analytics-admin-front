// eslint-disable-next-line @typescript-eslint/triple-slash-reference
// <reference path="../../node_modules/moment/moment.d.ts" />

import moment from 'moment'
import type { Moment } from 'moment'
import { FORMAT_DAY } from '@/enums/moment'

export const getPeriod = (
  start: number,
  end: number,
  type: moment.unitOfTime.DurationConstructor = 'days'
): [Moment, Moment] => {
  return [moment().startOf('day').subtract(start, type), moment().endOf('day').subtract(end, type)]
}
export const getDefaultPeriod = (): [Moment, Moment] => {
  return getPeriod(30, 1)
}
function getTimezoneOffset(d: Moment, targetTimezone = 8) {
  return (moment(d).utcOffset() - moment().utcOffset(targetTimezone).utcOffset()) * 60000
}
export const getTimestampList = (
  period: [Moment, Moment],
  type: moment.unitOfTime.DurationConstructor = 'days'
): [number, number] => {
  if (type === 'days') {
    return [
      period[0].startOf('day').valueOf() + getTimezoneOffset(period[0]),
      period[1].endOf('day').valueOf() + getTimezoneOffset(period[1])
    ]
  } else {
    return [period[0].valueOf() + getTimezoneOffset(period[0]), period[1].valueOf() + getTimezoneOffset(period[1])]
  }
}
export const format = (m: Moment | number, formatter: string = FORMAT_DAY) => {
  if (typeof m === 'number') {
    if ((m + '').length === 10) {
      m *= 1000
    }
    m = moment(m)
  }
  return m.format(formatter)
}
