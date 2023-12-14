import { request } from '@/api'
import {
  IOnlineSecParams,
  IOnlineSecData,
  IOnlineDashboardParams,
  IOnlineDashboardData,
  IOnlineTodayData,
  IOnlineTrendlineParams,
  IOnlineTrendlineData,
  IOnlinePeakRecordParams,
  IOnlinePeakRecordData
} from '@/api/model/realTime'

export function getOnlineSec(data: IOnlineSecParams) {
  return request<Array<IOnlineSecData>>({
    url: '/online/sec',
    method: 'post',
    data
  })
}

export function getOnlineDashboard(data: IOnlineDashboardParams) {
  return request<Array<IOnlineDashboardData>>({
    url: '/online/dashboard',
    method: 'post',
    data
  })
}

export function getOnlineToday(data: IOnlineDashboardParams) {
  return request<Array<IOnlineTodayData>>({
    url: '/online/today',
    method: 'post',
    data
  })
}

export function getOnlineTrendline(data: IOnlineTrendlineParams) {
  return request<IOnlineTrendlineData>({
    url: '/online/trendline',
    method: 'post',
    data
  })
}

export function getOnlinePeakRecord(data: IOnlinePeakRecordParams) {
  return request<Array<IOnlinePeakRecordData>>({
    url: '/online/peak/record',
    method: 'post',
    data
  })
}
