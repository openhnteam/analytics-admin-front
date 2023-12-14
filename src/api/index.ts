import axiosInternal, { AxiosRequestConfig, AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { HTTP_STRATEGY } from './strategy'
import { Ref, shallowRef } from 'vue'
import { useUserStoreOut } from '@/store/module/user'
import { HEADER_ACCESS_TOKEN_KEY } from '@/enums/http'
import storage from '@/utils/storage'
import { DEV_FORCE_PROXY, API_VERSION } from '@/enums/cache'

export interface ResponseWrapper<T> {
  success: boolean
  data: T
  message?: string
  code?: string
  traceId?: string
}

export interface UseRequestReturn<T = any> {
  response: Ref<ResponseWrapper<T> | undefined>
  data: Ref<ResponseWrapper<T> | undefined>
  success: Ref<Nullable<Boolean>>
  message: Ref<string | undefined>
  isFinished: Ref<boolean>
  isLoading: Ref<boolean>
  error: Ref<AxiosError<T> | undefined>
}

const viteBaseURL = typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''

const baseURL =
  import.meta.env.VITE_APP_REAL_ENV === 'development'
    ? storage.local.get(DEV_FORCE_PROXY)
      ? storage.local.get(DEV_FORCE_PROXY)
      : viteBaseURL
    : viteBaseURL

const instance: AxiosInstance = axiosInternal.create({
  baseURL,
  timeout: 300000
})

instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const userState = useUserStoreOut()
    const token = userState.getToken
    token && request.headers && (request.headers[HEADER_ACCESS_TOKEN_KEY] = token)
    const { method, data } = request
    if (method!.toLocaleUpperCase() === 'POST' && typeof data === 'undefined') {
      request.data = {}
    }
    request.url = encodeURI(request.url!)
    return request
  },
  (error: AxiosError) => {
    const { response } = error
    message.error({
      content: response?.status
    })
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // 不返回 axios response
    return response.data
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response
      const strategy = HTTP_STRATEGY.get(status)
      if (typeof strategy === 'function') {
        strategy(error)
      } else {
        message.error({ content: '您的网络发生异常，无法连接服务器' })
      }
    }
    // return Promise.resolve(null)
    return Promise.reject(error)
  }
)

export function request<T = any>(config: AxiosRequestConfig): Promise<ResponseWrapper<T>> {
  return new Promise((resolve, reject) => {
    instance
      .request<any, ResponseWrapper<T>>(config)
      .then((res: ResponseWrapper<T>) => {
        if (!res?.success) {
          message.error({ content: res?.message || '您的网络发生异常，无法连接服务器' })
          reject(res)
        } else {
          resolve(res as unknown as Promise<ResponseWrapper<T>>)
        }
      })
      .catch((e: Error | AxiosError) => {
        reject(e)
      })
  })
}

export function useRequest<T = any>(requestPromise: Promise<ResponseWrapper<T>>): UseRequestReturn<T> {
  const response = shallowRef<ResponseWrapper<T>>()
  const data = shallowRef<ResponseWrapper<T>>()
  const success = ref<Nullable<Boolean>>(null)
  const message = ref<string | undefined>(undefined)
  const isFinished = ref(false)
  const isLoading = ref(true)
  const error = shallowRef<AxiosError<T>>()

  requestPromise
    .then((r: any) => {
      response.value = r
      data.value = r.data
      success.value = r.success
      message.value = r.message
    })
    .catch((e: any) => {
      error.value = e
    })
    .finally(() => {
      isLoading.value = false
      isFinished.value = true
    })

  return {
    response,
    data,
    success,
    message,
    error,
    isFinished,
    isLoading
  }
}
