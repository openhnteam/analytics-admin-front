import { request } from '@/api'
import { GetMetricListReq, IMetricListData, GetMetricTrendReq, IMetricTrendLineData } from '@/api/model/metric'

enum Api {
  FETCH_METRIC_LIST = '/metric/fetch',
  FETCH_TREND_LINE = '/metric/trendline'
}

export function getMetricList(data: GetMetricListReq) {
  return request<IMetricListData>({
    url: Api.FETCH_METRIC_LIST,
    method: 'POST',
    data
  })
}

export function getMetricTrendLine(data: GetMetricTrendReq) {
  return request<IMetricTrendLineData>({
    url: Api.FETCH_TREND_LINE,
    method: 'POST',
    data
  })
}
