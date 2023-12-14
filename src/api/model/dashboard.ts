export type GetDashboardHomeReq = {
  appId: string
  period: string
}
export interface GetDashboardHomeResp {
  appTotalUser: number // 累计用户数
  avgNewUser7daysAgo: number // 新增用户(7日平均)
  avgTime7daysAgo: number // 使用时长(7日平均)
  avgUser7daysAgo: number // 活跃用户(7日平均)
  totalUser7days: number // 近7日总活跃用户数
  totalUser30days: number // 近30日总活跃用户数
}

export interface GetDashboardCardReq {
  appId: string
}

export interface GetDashboardCardResp {
  appTotalUser: number // 累计用户
  avgUser7daysAgo: number // 七日平均活跃用户
  avgNewUser7daysAgo: number // 七日平均新增用户
  yesterdaySession: number // 昨日打开次数（不用去重，即昨日总会话）
}

export interface GetDashboardTrendReq {
  appId: string
  period: string
}

export type GetDashboardTrendKey = 'total' | 'unique' | 'new' | 'session'
/* export enum Key {
  total = 'total',
  unique = 'unique',
  new = 'new',
  session = 'session'
} */

export type GetDashboardTrendResp = Array<
  {
    id: string //日期
  } & Record<GetDashboardTrendKey, number>
>
