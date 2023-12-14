export type PopularSingboardItem = {
    _id: string
    valueCount: number
    uv: number
    avg: number
    pvFormat: string
    uvFormat: string
    [key: string]: any
}

export interface GetPopularSingboardReq {
    appId: string
    page: number
    pageSize: number
    period: string
    sort: number
    xlxs?: boolean
}

export interface GetPopularSingboardResp {
    data: Array<PopularSingboardItem>
    page: number
    pageSize: number
    totalPage: number
    totalCount: number
}

