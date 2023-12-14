import { EventFilterItem } from './events'

export interface IRetentionParams {
  appId: string
  period: string
  newUser: boolean
  xlxs?: boolean
  firstAction?: {
    eventId: string
    filterList: Array<EventFilterItem>
  }
  secondAction?: {
    eventId: string
    filterList: Array<EventFilterItem>
  }
}

export interface IRetentionItem {
  count: number
  retention: number[]
  date: string
}

export interface IRetentionData {
  count: number
  rateItems: Array<IRetentionItem>
  items: Array<IRetentionItem>
}
