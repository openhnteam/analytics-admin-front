import { message } from 'ant-design-vue'
import { AxiosError } from 'axios'
import { useUserStoreOut } from '@/store/module/user'

// HTTP状态码策略
export const HTTP_STRATEGY = new Map([
  [
    400,
    () => {
      message.error('400，参数错误!')
    }
  ],
  [
    401,
    () => {
      message.error('未授权或授权已过期，请重新登录!')
      setTimeout(() => {
        const userState = useUserStoreOut()
        userState.logout()
      }, 500)
    }
  ],
  [
    403,
    () => {
      message.error('拒绝访问!')
      const userState = useUserStoreOut()
      userState.setup()
    }
  ],
  [
    404,
    (e: AxiosError) => {
      message.error(`接口地址错误，不存在接口：'${e.config.url}'`)
    }
  ],
  [
    500,
    () => {
      message.error('服务器发生错误，请联系管理员!')
    }
  ],
  [
    503,
    () => {
      message.error('Service Unavailable!')
    }
  ],
  [
    504,
    () => {
      message.error('接口发布中，请稍后再试...')
    }
  ]
])
