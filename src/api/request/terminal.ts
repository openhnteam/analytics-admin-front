import { request } from '@/api'
import { ILocationListParams, ILocationListData } from '../model/terminal'

export function getLocationList(data: ILocationListParams) {
  return request<ILocationListData>({
    url: '/location/list',
    method: 'post',
    data
  })
}
