<template>
  <div class="w-full h-full">
    <pro-layout v-model:collapsed="state.collapsed" v-model:selectedKeys="state.selectedKeys"
      v-model:openKeys="state.openKeys" layout="top" :headerHeight="64" theme="light"
      navTheme="light" :fixedHeader="true" :disableMobile="true" :hasSiderMenu="subMenuData && subMenuData.length !== 0">
      <template #menuHeaderRender>
        <router-link :to="{ path: '/' }" class="ml-4">
          <img src="@/assets/fire-bird-logo.png" class="ml-4"/>
        </router-link>
      </template>
      <template #rightContentRender>
        <TopRight :menuData="menuDataWithoutChildren" />
      </template>
      <MainContent :subMenuData="subMenuData" />
    </pro-layout>
  </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout'
import type { RouteContextProps } from '@ant-design-vue/pro-layout'
import MainContent from './MainContent.vue'
import { usePermissionStore } from '@/store/module/permission'
import { useAppStore } from '@/store/module/app'
import clonedeep from 'lodash.clonedeep'

const appName = typeof import.meta.env.VITE_APP_NAME === 'string' ? import.meta.env.VITE_APP_NAME : ''

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const asyncRoutes = permissionStore.getAysncRoutes

type MenuDataExtendType = { disableApplication?: number[] }
type MenuDataType = MenuDataExtendType & RouteRecordRaw

let subMenuData = ref<MenuDataType[]>([])

const router = useRouter()
const { menuData } = getMenuData(clearMenuItem(asyncRoutes))
const menuDataWithoutChildren = menuData.map((m) => ({ ...m, children: [] }))

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false,
  openKeys: [],
  selectedKeys: []
})

const recuFilterRoutesByAppType = (routers: MenuDataType[]) => {
  let subMenuRoutes: MenuDataType[] = []
  subMenuRoutes = routers.filter((menu) => {
    if (menu.children?.length) {
      menu.children = recuFilterRoutesByAppType(menu.children)
    }
    return true
  })
  return subMenuRoutes
}

watchEffect(() => {
  if (router.currentRoute) {
    const targetPath = '/' + router.currentRoute.value.path.split('/')[1]
    if (targetPath.length > 1) {
      const routes = router.getRoutes()
      let targetRoute = routes.find(({ path }) => path === targetPath)
      let subMenuRoutes: MenuDataType[] = []

      if (targetRoute && targetRoute.children) {
        subMenuRoutes = recuFilterRoutesByAppType(clonedeep(targetRoute.children))
      }
      if (targetRoute) {
        subMenuData.value = subMenuRoutes
      } else {
        subMenuData.value = []
      }
    }
  }
})
</script>
<style lang="less" scoped>
:deep(.ant-pro-basicLayout) {
  @apply w-full h-full;

  >.ant-layout {
    @apply w-full h-full flex justify-between overflow-hidden;

    .ant-pro-basicLayout-content {
      @apply flex-1 overflow-auto overflow-hidden;
    }
  }
  .ant-pro-top-nav-header-main {
    max-width: 100%;
  }
}
</style>
