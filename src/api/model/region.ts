export type GetRegionListReq = {
  appId: string
  period: string
  country: string
  prov: string
}

export type UserKey = 'total' | 'new' | 'back'
export type RegionItem = {
  id: string
  /* total: number // 活跃用户
    new: number // 新增用户
    back: number // 回访用户 */
} & Record<UserKey, number>
export type GetRegionListResp = {
  list: Array<RegionItem>
} & Record<UserKey, number>
