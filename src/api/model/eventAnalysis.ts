/* eslint-disable */
export namespace EventAnalysis {
  export interface indexDataItem {
    pointerEvent: string
    pointerEventParameter: string
    filterAttributeList: Array<FilterAttributeItem>
    eventSegIdList?: Array<string>
  }
  export interface FilterAttributeItem {
    selectionAttribute: string
    ruleCompare: number
    selectionAttributeParameter: string
    eventFilterIdList?: Array<string>
  }

  export interface conditionAttributeItem {
    compareTitle: string
    compareType: [number | string]
    enableInput: boolean
  }
}
