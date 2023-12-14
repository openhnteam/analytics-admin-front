export enum ApplicationType {
  '全部应用类型' = 0,
  'iOS' = 1,
  '安卓' = 2,
  '微信小程序' = 3,
  '支付宝小程序' = 4,
  'Web' = 5
}

export enum ApplicationSort {
  '默认排序' = '',
  '活跃用户' = 'avg7DaysUv',
  '累计用户' = 'totalUv',
  '新增用户' = 'avg7DaysNewUv',
  '打开次数' = 'yesterdayPv'
}

interface FilterListType {
  value: string | number
  label: string
}

export const applicationTypeList: Array<FilterListType> = []

export const applicationSortList: Array<FilterListType> = []

const detailsList = (params: any, list: Array<FilterListType>) => {
  for (const key in params) {
    const keyToAny: any = key
    if (isNaN(+keyToAny)) {
      const anyValue: any = params[key]
      list.push({
        value: anyValue,
        label: key
      })
    }
  }
}

detailsList(ApplicationType, applicationTypeList)
detailsList(ApplicationSort, applicationSortList)
