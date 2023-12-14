import { RouteRecordRaw } from 'vue-router'
import clonedeep from 'lodash.clonedeep'

// 导入全部的异步路由数据
const asyncRoutesMap = import.meta.globEager('./async/**/*.ts')

export const asyncRoutes: RouteRecordRaw[] = []

Object.keys(asyncRoutesMap).forEach((key) => {
  const mod = asyncRoutesMap[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  asyncRoutes.push(...modList)
})

// console.log('asyncRoutes', asyncRoutes)

export const flatAsyncRoutes: RouteRecordRaw[] = []

function handleFlat(list: RouteRecordRaw[]): RouteRecordRaw[] {
  let ret: RouteRecordRaw[] = []
  list.forEach((r) => {
    // console.log('r', r)
    if (!r.component) {
      return
    }
    /* if (r.component.name !== 'RouterView') {
      ret.push(r)
    } */
    ret.push(r)
    if (r.children) {
      ret = [...ret, ...handleFlat(r.children)]
    }
  })
  return ret
}

asyncRoutes.forEach((asyncLayout) => {
  const { component, children } = asyncLayout
  if (!component || !children || !children.length) {
    return
  }
  const cloneLayout = clonedeep(asyncLayout)
  cloneLayout.children = handleFlat(cloneLayout.children!)
  flatAsyncRoutes.push(cloneLayout)
})

// console.log('flatAsyncRoutes', flatAsyncRoutes)
