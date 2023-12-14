export type GetSessionListReq = {
  apiKey?: string
  appId: string
  period: string
}

export enum ParamKey {
  total = 'total',
  new = 'new',
  unique = 'unique'
}

export enum ParamDurationKey {
  duration = 'duration',
  unique = 'unique'
}

export type ParamData = Record<ParamKey, number>
export type ParamDurationData = Record<ParamDurationKey, number>

export type GetSessionListResp = {
  list: Array<
    {
      id: string

      totalDuration: number
      eventsCount: number
    } & ParamData
  >
} & ParamData

export type GetSessionDurationResp = {
  list: Array<
    {
      id: string

      totalDuration: number
      eventsCount: number
    } & ParamDurationData
  >
} & ParamDurationData

export type DurationRange =
  | '0 - 10 秒'
  | '11 - 30 秒'
  | '31 - 60 秒'
  | '1 - 3 分'
  | '3 - 10 分'
  | '10 - 30 分'
  | '30 - 60 分'
  | '> 1 小时'

export type GetSessionDurationReq = {
  appId: string
  period: string
}

export interface GetSessionDurationItem {
  id: DurationRange
  count: number
  percent: string
}
