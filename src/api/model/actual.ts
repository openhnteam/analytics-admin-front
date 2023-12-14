export interface OnlineTargetItem {
  name: string
  title: string
  itemData: {
    current: number
    list: number[]
    percent: string
    times: string[]
    top: number
  }
}
export interface TodayTargetItem {
  name: string
  title: string
  count: number
  rase: string
  itemData: {
    current: number
    list?: number[]
    percent: string
    times?: string[]
    top: number
  }
}

export interface realtime {
  current: number
  top: number
  percent: string
  list: number[]
  times: string[]
}

export interface GetUserListReq {
  appId: string
}
export type GetOnlineDashboardResp = OnlineTargetItem[]
export type GetOnlineTodayResp = TodayTargetItem[]

export interface GetOnlineTrendReq {
  appId: string
  time: string
  type: string
}
export interface GetOnlineTrendResp {
  active: {}
  list: any[]
}
export type GetTrendAnalyticsTypeKey = 'active' | 'new' | 'open'

export interface GetTrendAnalyticsReq {
  appId: string
  period: string
}

export type GetTrendAnalyticsResp = Array<{
  id: string
  value: number
}>

export interface GetTodayOnlineReq {
  appId: string
  newUser: boolean
  date: string
}
