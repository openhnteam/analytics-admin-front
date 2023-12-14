export interface IAccessPathParams {
  appId: string
  period: string
  userId?: string
  deviceNo?: number
  page: number
  pageSize: number
}

export interface IPath {
  page: string
  pageUrl: string
  visitTime: string
  duration: number
}

export interface IPageItem {
  sid: string
  userId: string
  deviceNo: string
  visitTime: string
  totalDuration: number
  pages: Array<IPath>
}

export interface IAccessPathData {
  count: number
  list: Array<IPageItem>
}

export interface ISessionDurationParams {
  appId: string
  period: string
}

export interface ISessionDuration {
  id: string
  count: number
  percent: string
}

export interface ISessionItem {
  pv: number
  newPv: number
  uv: number
  duration: number
  id: string
}
export interface ISessionListData {
  pv: number
  newPv: number
  uv: number
  duration: number
  list: Array<ISessionItem>
}
