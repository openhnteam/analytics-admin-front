/// <reference types="@types/js-cookie" />

import Cookie from 'js-cookie'

/** @public */
export type StorageType = 'localStorage' | 'sessionStorage'

/** @public */
export interface IStorage {
  local: Store
  session: Store
  cookie: Cookies.CookiesStatic
}

const JsonParse = (val: any) => {
  try {
    val = JSON.parse(val)
  } catch (error) {
    // do nothing
  }
  return val
}

const JsonStringify = (val: any) => {
  return typeof val === 'object' ? JSON.stringify(val) : val
}

/** @public */
export interface Params {
  expires: number
}

const ONE_DAY = 24 * 60 * 60 * 1000

/** @public */
export class Store {
  store: Storage
  constructor(key: StorageType) {
    if (key === 'localStorage') {
      this.store = window.localStorage
    } else {
      this.store = window.sessionStorage
    }
  }
  get(key: string) {
    const options = JsonParse(this.store.getItem(key))
    let rtn = options
    if (options) {
      if (options.expires) {
        const now = new Date().getTime()
        if (now - options.startTime > options.expires * ONE_DAY) {
          this.store.removeItem(key)
          rtn = null
        } else {
          rtn = JsonParse(options.val)
        }
      } else {
        if (options.val) {
          rtn = JsonParse(options.val)
        } else {
          this.store.removeItem(key)
          rtn = null
        }
      }
    }
    return rtn
  }
  set(key: string, val: any, params?: Params) {
    const options = {
      key,
      val: JsonStringify(val),
      expires: params && params.expires ? params.expires : 0,
      startTime: new Date().getTime()
    }
    this.store.setItem(key, JsonStringify(options))
  }
  has(key: string) {
    return this.store.get(key) !== undefined
  }
  remove(key: string) {
    this.store.removeItem(key)
  }
  clear() {
    this.store.clear()
  }
  forEach(callback: (key: string, val: any) => void) {
    for (const key in this.store) {
      const val = this.store[key]
      callback(key, val)
    }
  }
}

/** @public */
const storage: IStorage = {
  local: new Store('localStorage'),
  session: new Store('sessionStorage'),
  cookie: Cookie
}

export default storage
