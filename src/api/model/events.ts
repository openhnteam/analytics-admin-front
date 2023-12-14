export type period = string | 'month' | '60days' | '30days' | '7days' | 'yesterday' | 'hour'

export interface IInfoListParams {
  appId: string
  xlxs?: boolean
  eventStatus?: number
}

export interface IInfoListData {
  eventId: string
  eventName: string
  eventDes: string
  active: boolean
}

export interface ISegInfoListParams {
  appId: string
  xlxs?: boolean
  eventId: string
  segStatus?: number
}

export interface ISegInfoListData {
  segId: string
  segName: string
  active: boolean
  segStatus?: number
}

export interface IEventStsListParams {
  appId: string
  xlxs?: boolean
  period: string
  eventIds: Array<string>
}

export interface IEventStsListData {
  pv: number
  newUv: number
  uv: number
  eventId: string
  list: Array<{ pv: number; newUv: number; uv: number }>
}

export interface EventSeriesItemType {
  key: string
  type: string
  name: string
  data: Array<number>
}

export interface IEventSegListParams {
  appId: string
  xlxs?: boolean
  period: string
  eventId: string
  segId: string
  key: string
  page: number
  pageSize: number
}

export interface EventSegItemType {
  pv: number
  newUv: number
  uv: number
  id: string
  uvFormat: string
  pvFormat: string
  newUvFormat: string
}

export interface IEventSegListData {
  count: number
  list: Array<EventSegItemType>
}

export interface IEventSegValueListParams {
  appId: string
  xlxs?: boolean
  period: string
  eventId: string
  segId: string
  segValue: string
}

export interface EventInfoItemType {
  eventId: string
  eventName: string
  eventDes: string
  eventStatus?: number
}

export interface BatchOperationType { 
  eventId: string, 
  eventStatus: number 
}

export interface IEditEventInfoBatchParams {
  appId: string
  xlxs?: boolean
  list: Array<BatchOperationType>
}

export interface EditEventSegEditItem {
  segId: string
  segName: string
  segStatus: number
}

export interface IEditEventSegEditBatchParams {
  appId: string
  xlxs?: boolean
  eventId: string
  list: Array<EditEventSegEditItem>
}

export interface EventFilterItem {
  ruleCompare: number
  segId: string
  segValue: string
}

export interface IEventOlapIdParams {
  appId: string
  xlxs?: boolean
  eventId: string
  segId: string
  period: string
  filterList: Array<EventFilterItem>
}

export interface IEventOlapSegParams extends IEventOlapIdParams {
  page: number
  pageSize: number
  sort?: number
}

export interface EventOlapSegItemType {
  pv: number
  newUv: number
  uv: number
  id: string
  uvFormat: string
  pvFormat: string
  newUvFormat: string
  avg: number
}

export interface IEventOlapSegData {
  count: number
  list: Array<EventOlapSegItemType>
}

export interface IEventOlapSegidValParams {
  appId: string
  xlxs?: boolean
  eventId: string
  segId: string
}

export interface AnalysisRetentionItem {
  id: number
  eventId: string | undefined
  eventSegId: string
  filterList: Array<EventFilterItem>
}

export interface AnalysisFilterEmitData {
  firstAction: {
    eventId: string
    filterList: Array<EventFilterItem>
  }
  secondAction?: {
    eventId: string
    filterList: Array<EventFilterItem>
  }
}
