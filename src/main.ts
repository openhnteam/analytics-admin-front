import 'virtual:windi.css'
import '@ant-design-vue/pro-layout/dist/style.css'
import '@/assets/style/antd.less'
import '@/assets/style/global.less'
import 'ant-design-vue/es/message/style'
import 'ant-design-vue/es/notification/style'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { setupStore } from './store'
import { ConfigProvider } from 'ant-design-vue'
import ProLayout from '@ant-design-vue/pro-layout'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

async function boostrap() {
  const app = createApp(App)
  setupStore(app)
  app.use(router).use(ConfigProvider).use(ProLayout)

  app.mount('#app')
}

boostrap()
