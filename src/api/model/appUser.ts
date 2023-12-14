import { TimeDataSource } from './index'

export type GetUserByTimeReq = {
  appId: string
  period: string
}

export interface AnalysisData {
  u: number // unique locations 累计用户
  n: number // new sessions 新增用户
  t: number // total sessions
  e: number // events or requests sent to server
  d: number // total session duration
}
export type Meta = Record<string, Array<string>> & { countries: Array<string> }
export type GetUserByTimeResp = TimeDataSource<AnalysisData, Meta>

export type GetUserListReq = {
  appId: string
  period: string
}

export type UserKey = 'uv' | 'newUv' | 'backUv'
export type UserItem = {
  id: string
  uv: number
  newUv: number
  backUv: number
}
export type GetUserListResp = {
  list: Array<UserItem>
} & Record<UserKey, number>

export type GetUserAccessPathReq = {
  appId: string
  period: string
  userId: string
  deviceId: string
  page?: number
  pageSize: number
}

export type GetUserAccessPathResq = {
  list: Array<any>
  count: number
}

export interface ILoginParams {
  userName: string
  password: string
  code: string
  key: string
}

export interface ICreateAccountParams {
  userName: string
  password: string
}
