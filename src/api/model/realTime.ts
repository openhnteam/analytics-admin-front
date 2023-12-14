export interface IOnlineSecParams {
  appId: string
  date: string
  newUser: boolean
}

export interface IOnlineSecData {
  id: string
  value: number
}

export interface IOnlineDashboardParams {
  appId: string
}

export interface OnlineDashboardItemData {
  current: number
  top: number
  percent: string
  list: Array<number>
  times: Array<string>
}

export interface IOnlineDashboardData {
  title: string
  name: string
  itemData: OnlineDashboardItemData
}

export interface IOnlineTodatItemData {
  current: number
  yesterday: number
  week: number
  percent: string
  weekPercent: string
}

export interface IOnlineTodayData {
  title: string
  name: string
  itemData: IOnlineTodatItemData
}

export interface IOnlineTrendlineParams {
  appId: string
  type: string
  time: string
}

export interface OnlineTrendlineItem {
  id: string
  today: number
  yesteday: number
}

export interface IOnlineTrendlineData {
  count: number
  list: Array<OnlineTrendlineItem>
}

export interface IOnlinePeakRecordParams {
  appId: string
  period: string
}

export interface IOnlinePeakRecordData {
  id: string
  value: number
}