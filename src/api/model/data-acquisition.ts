export interface GetDeviceListReq {
  appId: string
  deviceName?: string
}
export interface GetDeviceListResp {
  create_time: string
  device_id: string
  device_name: string
}
export interface DeviceReq {
  appId: string
  deviceIds: string[]
}

export interface Device {
  deviceId: string
  deviceName: string
}

export interface AddDeviceReq {
  appId: string
  deviceIds: Array<Device>
}

export interface DebugListReq {
  appId: string
  debugName?: string
  deviceId?: string | undefined
  period?: [string, string]
}

export interface DebugListResp {
  id: string
  name: string
  invalid: number
  deadline: string
}

export interface DebugInitReq {
  appId: string
  debugName: string
  deviceId: string
}

export interface DebugInitResp {
  deadline: string
  debug_id: string
}

export interface DebugShowReq {
  debugId: string
}

export interface DebugEventInfoSeg {
  channel: string
  name: string
  pageCode1: string
  pageCode2: string
  pageTitle1: string
  pageTitle2: string
  url: string
  userId: string
  version: string
}

export interface DebugEventInfo {
  count: number
  dow: number
  hour: number
  key: string
  sum: number
  segmentation: DebugEventInfoSeg
  timestamp: number
}

export interface DebugShowResp {
  createTime: string
  eventInfo: DebugEventInfo[]
}

export interface EventIds {
  eventId: string
  eventName: string
  eventDes?: string
}
export interface AddEventReq {
  appId: string
  eventIds: EventIds[]
}

export enum EventStatus {
  unregister = 'unregister', // 未注册
  suspend = 'suspend', // 暂停计算
  calculate = 'calculate' // 计算中
}

export enum EventStatusReverse {
  register = 'register', // 注册事件
  suspend = 'suspend', // 暂停计算
  calculate = 'calculate' // 恢复计算
}

export enum EventSegStatus {
  calculate = 'calculate',
  suspend = 'suspend',
  uncalculate = 'uncalculate'
}

export interface GetEventListReq {
  appId: string
  status: EventStatus
}

export interface GetEventListResp {
  event_id: string
  event_name: string
  event_des: string
  update_time: string
}

export interface SetEventStatusReq {
  appId: string
  eventIds: string[]
  status: EventStatusReverse
}

export interface CopyEvents {
  appId: string
  srcAppId: string
}

export interface GetEventSegReq {
  appId: string
  eventId: string
  status: EventSegStatus
}

export interface GetEventSegResp {
  seg_id: string
  seg_name: string
  update_time: string
}

export interface SetEventSegStatus {
  appId: string
  eventId: string
  segIds: string[]
  status: EventSegStatus
}

export interface EventSeg {
  segId: string
  segName: string
}

export interface EditEventSegReq {
  appId: string
  eventId: string
  eventName: string
  eventDes?: string
  segIds: EventSeg[]
}

export interface DebugAnalyticsReq {
  debugId: string
}

export interface EventLogSeg {
  eventSeg: string
  eventSegError: string
  eventSegValue: string[]
}
export interface EventDetailItem {
  eventId: string
  eventIdError: string
  eventSegs: EventLogSeg[]
}

export interface DebugAnalyticsResp {
  reportCount: number
  errorCount: number
  eventCount: number
  errorList: string[]
  eventDetail: EventDetailItem[]
}

export interface EndDebugReq {
  debugIds: string[]
}

export interface MethodsListReq {
  appId: string
}

export interface MethodsListResp {
  app_id: string
  create_time: string
  id: number
  project_name: string
  project_type: string
  update_time: string
}

export interface EditMethodReq {
  id: number
  name: string
}

export type DelMethod = Pick<EditMethodReq, 'id'>

export interface CreateMethod {
  appId: string
  name: string
  type: number
}

export interface Del_App {
  appId: string
}
