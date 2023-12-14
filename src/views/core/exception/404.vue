<template>
  <a-result
    status="404"
    :style="{
      height: '100%',
      background: '#fff'
    }"
    title="404"
    sub-title="很抱歉，此页面未找到。"
  >
    <template #extra>
      <a-button type="primary" @click="handleClick">返回首页</a-button>
    </template>
  </a-result>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { VIEW_HOME, VIEW_NOT_FOUND_NAME } from '@/enums/view'
const router = useRouter()
const handleClick = () => {
  console.log('info')
  message.info('BackHome button clicked!')
  console.log('router', router)
  router.replace(VIEW_HOME)
}
</script>
<script lang="ts">
export default {
  name: VIEW_NOT_FOUND_NAME
}
</script>
