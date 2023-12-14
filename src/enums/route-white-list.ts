import { RouteRecordName } from 'vue-router'
import { VIEW_LOGIN_NAME } from '@/enums/view'

export enum RouteWhitePathList {
  VIEW_OPEN_APP_PATH = '/open-app'
}
export const whiteNameList: RouteRecordName[] = [VIEW_LOGIN_NAME]
export const whitePathList: RouteWhitePathList[] = Object.values(RouteWhitePathList)
