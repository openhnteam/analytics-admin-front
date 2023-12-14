<template>
  <div class="main-content">
    <div class="flex-1 transition-all pb-4">
      <CustomRouteView />
    </div>
  </div>
</template>
<script setup lang="ts">
import CustomRouteView from './RouterView.vue'
import type { RouteContextProps } from '@ant-design-vue/pro-layout'
import { RouteRecordRaw } from 'vue-router'

const router = useRouter()

defineProps<{
  subMenuData: RouteRecordRaw[]
  iconScriptUrl?: string
}>()

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false,
  openKeys: [],
  selectedKeys: []
})

watchEffect(() => {
  if (router.currentRoute) {
    const currentPath = router.currentRoute.value.path
    const matched = router.currentRoute.value.matched.concat()
    state.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path)
    const openKeys: string[] = []
    const arr = currentPath.split('/')
    arr.shift()
    while (arr.length > 1) {
      openKeys.push(((openKeys.length ? openKeys[openKeys.length - 1] : '') + '/' + arr.shift()) as string)
    }
    state.openKeys = openKeys
  }
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainContent'
})
</script>
<style lang="less" scoped>
::deep.ant-menu-sub.ant-menu-inline {
  background: transparent;
}

.main-content {
  // margin-top: 10px;
}
</style>
