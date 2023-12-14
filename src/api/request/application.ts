import { request } from '@/api'
import {
  AllApplicationType,
  CreateApplicationType,
  AllApplicationListType,
  UserDashbordType,
  DashboardHomeType,
  UserDashbordListType,
  UserDashbordListResType,
  IUpdateApplicationParams
} from '@/api/model'

export function getAllApplication() {
  return request<AllApplicationListType>({
    url: '/app/all',
    method: 'get'
  })
}

export function createApplication(data: CreateApplicationType) {
  return request<AllApplicationType>({
    url: '/app/create',
    method: 'post',
    data
  })
}

export function getDashbordHome(data: UserDashbordType) {
  return request<DashboardHomeType>({
    url: '/dashboard/home',
    method: 'post',
    data
  })
}

export function getUserDashbordList(data: UserDashbordListType) {
  return request<UserDashbordListResType>({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function updateApplication(data: IUpdateApplicationParams) {
  return request<AllApplicationType>({
    url: '/app/update',
    method: 'post',
    data
  })
}
