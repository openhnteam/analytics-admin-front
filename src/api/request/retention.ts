import { request } from '@/api'
import { IRetentionData, IRetentionParams } from '../model/retention'

export function getRetentionList(data: IRetentionParams) {
  return request<IRetentionData>({
    url: '/retention/list',
    method: 'POST',
    data
  })
}
