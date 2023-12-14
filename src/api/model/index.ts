export type TimeDataSource<T, R> = Record<
  string, // 2021年 或者 地区
  Record<
    string, // 11月 或者 地区
    Record<
      string, // 1日 或者 地区
      Record<
        string, // 0时 或者 地区
        T
      > &
        T
    > &
      T
  > &
    T
> & {
  meta: R
}

export * from './application'
export * from './overview'
