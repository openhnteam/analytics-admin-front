import type { Ref } from 'vue'
import clonedeep from 'lodash.clonedeep'

export interface Pagination {
  current: number
  pageSize: number
  total: number
  hideOnSinglePage?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: string[]
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => string
}

export function usePagination<T>(
  tableData: Ref<Array<T>>,
  {
    pageSize = 30,
    hideOnSinglePage = true,
    showSizeChanger = false,
    pageSizeOptions = ['10', '20', '30', '40', '50'],
    showQuickJumper = false,
    showTotal
  } = {} as Partial<Pagination>
) {
  const initialPagination: Pagination = {
    current: 1,
    pageSize,
    total: tableData.value.length,
    hideOnSinglePage,
    showSizeChanger,
    pageSizeOptions,
    showQuickJumper
  }
  if (showTotal) {
    initialPagination.showTotal = showTotal
  }
  const pagination = reactive<Pagination>(clonedeep(initialPagination))

  const total = ref(0)

  watchEffect(
    // () => tableData.value,
    () => {
      pagination.total = total.value || tableData.value.length
    }
  )

  const pagedTableData = computed(() => {
    return tableData.value.slice(
      (pagination.current - 1) * pagination.pageSize,
      pagination.current * pagination.pageSize
    )
  })

  const handlePaginationChange = (pag: Pagination) => {
    Object.assign(pagination, pag)
  }

  const resetPagination = () => {
    // Object.assign(pagination, initialPagination)
    pagination.total = 0
    pagination.current = 1
  }

  return {
    total,
    pagination,
    pagedTableData,
    resetPagination,
    handlePaginationChange
  }
}

export interface PaginationRemote {
  current: number
  pageSize: number
  total: number
  hideOnSinglePage?: boolean
  showSizeChanger?: boolean
  pageSizeOptions?: string[]
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => string
}

/**
 * 单分页use，用来调远程分页接口使用，单纯维护分页信息
 * @param param
 * @returns
 */
export function usePaginationRemote(
  {
    pageSize = 10,
    hideOnSinglePage = true,
    showSizeChanger = false,
    pageSizeOptions = ['10', '20', '30', '40', '50', '100'],
    showQuickJumper = false,
    showTotal
  } = {} as Partial<PaginationRemote>
) {
  const initialPagination: Pagination = {
    current: 1,
    pageSize,
    total: 0,
    hideOnSinglePage,
    showSizeChanger,
    pageSizeOptions,
    showQuickJumper
  }
  if (showTotal) {
    initialPagination.showTotal = showTotal
  }
  const pagination = reactive<Pagination>(clonedeep(initialPagination))

  const handlePaginationChange = (page: Pagination) => {
    Object.assign(pagination, page)
  }

  const resetPagination = () => {
    Object.assign(pagination, initialPagination)
  }

  return {
    pagination,
    resetPagination,
    handlePaginationChange
  }
}
