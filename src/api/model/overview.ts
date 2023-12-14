export interface DashboardTrendlineType {
  appId: string
  period: string
}

export interface DashboardHomeResType {
  appId: string
}

export interface TrendlineItemType {
  id: string
  totalUv: number
  uv: number
  newUv: number
  pv: number
}

export interface OverviewDataType {
  totalUv: number
  last30DaysUv: number
  last7DaysUv: number
  avg7DaysDuration: number
  avg7DaysUv: number
  avg7DaysNewUv: number
  yesterdayPv: number
}
