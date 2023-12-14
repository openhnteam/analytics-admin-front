export type GetMetricListReq = {
  apiKey?: string
  appId: string
  metric: keyof typeof Metric
  period: string
  page?: number
  pageSize?: number
}

export type GetMetricTrendReq = {
  appId: string
  metric: keyof typeof Metric
  value: string
  period: string
  xlxs?: boolean
}

/**
 * app_versions(应用版本)、carriers(运营商)、countries(国家)、density(像素密度)、devices（设备）、langs(语言)、os(平台)、os_versions（平台版本）、resolutions(分辨率)
 */
export enum Metric {
  app_versions = 'app_versions',
  carriers = 'carriers',
  countries = 'countries',
  density = 'density',
  devices = 'devices',
  langs = 'langs',
  os = 'os',
  os_versions = 'os_versions',
  platform_versions = 'platform_versions',
  resolutions = 'resolutions',
  vendor = 'vendor',
  channel = 'channel',
  install_channel = 'install_channel',
  scene = 'scene'
}

export type MetricKey = 'newUser' | 'totalUser' | 'totalSession'
export type MetricRateKey = 'newUserRate' | 'totalUserRate' | 'totalSessionRate'

export type MetricItem = {
  id: string
  key?: string
} & Record<MetricKey, number>

export type MetricTrendlineItem = {
  id: string
  uv: number
  new: number
}

export interface IMetricRecord {
  pv: number
  newUv: number
  uv: number
  id: string
  key?: string
  vendor?: string
}
export interface IMetricExtraKey {
  totalUv: number
  totalNewUv: number
  totalPv: number
}
export type FullMetric = IMetricRecord & IMetricExtraKey

export type FullMetricList = Array<MetricItem & Record<MetricRateKey, number>>

export type MetricList = Array<IMetricRecord & Record<MetricRateKey, number>>

export interface IMetricListData {
  list: Array<IMetricRecord>
  count: number
  pv: number
  uv: number
  newUv: number
}

export interface IMetricTrendLineData {
  list: Array<IMetricRecord>
  uv: number
  newUv: number
  pv: number
  count: number
}
