import { request } from '@/api'
import {
  IInfoListParams,
  IInfoListData,
  ISegInfoListParams,
  ISegInfoListData,
  IEventStsListParams,
  IEventStsListData,
  IEventSegListParams,
  IEventSegListData,
  IEventSegValueListParams,
  IEditEventInfoBatchParams,
  IEditEventSegEditBatchParams,
  IEventOlapIdParams,
  IEventOlapSegidValParams,
  IEventOlapSegParams,
  IEventOlapSegData
} from '@/api/model/events'

export function getEventInfoList(data: IInfoListParams) {
  return request<Array<IInfoListData>>({
    url: '/event/info/list',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function getEventSegInfoList(data: ISegInfoListParams) {
  return request<Array<ISegInfoListData>>({
    url: '/event/seg/info/list',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function getStsList(data: IEventStsListParams) {
  return request<Array<IEventStsListData>>({
    url: '/event/sts/list',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function getSegStsList(data: IEventSegListParams) {
  return request<IEventSegListData>({
    url: '/event/seg/sts/list',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function getSegValueStsList(data: IEventSegValueListParams) {
  return request<IEventStsListData>({
    url: '/event/seg/value/sts/list',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function editEventInfoBatch(data: IEditEventInfoBatchParams) {
  return request({
    url: '/event/info/edit/batch',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function editEventSegEditBatch(data: IEditEventSegEditBatchParams) {
  return request({
    url: '/event/seg/info/edit/batch',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function getEventOlapId(data: IEventOlapIdParams) {
  return request<IEventStsListData>({
    url: '/event/olap/id',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}

export function getEventOlapSeg(data: IEventOlapSegParams) {
  return request<IEventOlapSegData>({
    url: '/event/olap/seg',
    method: 'post',
    data
  })
}

export function getEventOlapSegidVal(data: IEventOlapSegidValParams) {
  return request<Array<string>>({
    url: '/event/olap/segid/values',
    method: 'post',
    data,
    responseType: data?.xlxs ? 'blob' : 'json'
  })
}
