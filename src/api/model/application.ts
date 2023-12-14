export interface AllApplicationType {
  appId: string
  key: string
  name: string
  salt: string
  type: string | number
  createTime: string
}

export interface AllApplicationListType {
  list: Array<AllApplicationType>
  count: Number
}

export interface CreateApplicationType {
  name: string
  type: string | number
}

export interface UserDashbordType {
  appId: string
}

export interface DashboardHomeType {
  totalUv: number
  last30DaysUv: number
  last7DaysUv: number
  avg7DaysDuration: number
  avg7DaysUv: number
  avg7DaysNewUv: number
  yesterdayPv: number
}

export interface UserDashbordListType {
  appId: string
  period: string
}

export interface UserDashbordListItem {
  uv: number
  newUv: number
  backUv: number
  id: string
}

export interface UserDashbordListResType {
  uv: number
  newUv: number
  backUv: number
  list: Array<UserDashbordListItem>
}

export interface IUpdateApplicationParams {
  appId: string
  name: string
  type: string | number
}
