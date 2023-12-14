import { request } from '@/api'
import {
  IAccessPathParams,
  IAccessPathData,
  ISessionDurationParams,
  ISessionDuration,
  ISessionListData
} from '../model/participation'

export function getAccessPath(data: IAccessPathParams) {
  return request<IAccessPathData>({
    url: '/page/sid/search',
    method: 'post',
    data
  })
}

export function getSessionDuration(data: ISessionDurationParams) {
  return request<ISessionDuration[]>({
    url: '/session/duration',
    method: 'post',
    data
  })
}

export function getSessionList(data: ISessionDurationParams) {
  return request<ISessionListData>({
    url: '/session/list',
    method: 'post',
    data
  })
}
