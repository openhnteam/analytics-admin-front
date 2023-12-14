import { request } from '@/api'
import { GetUserByTimeReq, GetUserListResp, ILoginParams, ICreateAccountParams } from '../model/appUser'

enum Api {
  USER_LIST = '/user/list'
}

export function getUserList(data: GetUserByTimeReq) {
  return request<GetUserListResp>({
    url: Api.USER_LIST,
    method: 'post',
    data
  })
}

export function getAccountCode() {
  return request<{ svg: string; key: string }>({
    url: '/account/code',
    method: 'get'
  })
}

export function getAccountLogin(data: ILoginParams) {
  return request<{ token: string }>({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function createAccount(data: ICreateAccountParams) {
  return request<{ token: string }>({
    url: '/account/setup',
    method: 'post',
    data
  })
}
