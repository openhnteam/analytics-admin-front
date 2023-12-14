import { request } from '@/api'
import { DashboardTrendlineType, TrendlineItemType, DashboardHomeResType, OverviewDataType } from '@/api/model'

export function getDashboardTrendline(data: DashboardTrendlineType) {
  return request<Array<TrendlineItemType>>({
    url: '/dashboard/trendline',
    method: 'post',
    data
  })
}

export function getDashboardHome(data: DashboardHomeResType) {
  return request<OverviewDataType>({
    url: '/dashboard/home',
    method: 'post',
    data
  })
}
