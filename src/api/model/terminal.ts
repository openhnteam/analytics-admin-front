export interface ILocationListParams {
  appId: string
  period: string
  country: string
  prov: string
  xlxs?: boolean
}

export interface ILocationItem {
  id: string
  pv: number
  uv: number
  pvFormat: string
  uvFormat: string
}

export interface ILocationListData {
  count: number
  list: Array<ILocationItem>
}
