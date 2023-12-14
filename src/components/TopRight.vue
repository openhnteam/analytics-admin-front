<template>
  <div class="comp-top-right">
    <div
      :key="menu.name"
      v-for="menu in props.menuData"
      :class="currentPathKey === menu.path ? 'router-link-active' : 'router-link'"
      @click="menuClick(menu)"
    >
      {{ menu.meta?.title }}
    </div>
    <a-tooltip placement="bottom" title="退出登录">
      <div class="flex items-center cursor-pointer ml-9 mr-5">
        <img class="w-7 h-5.5" src="@/assets/images/home/logout.svg" alt="" @click="logout" />
      </div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
import { useUserStoreOut } from '@/store/module/user'
import { VIEW_LOGIN_NAME } from '@/enums/view'

let currentPathKey = ref('')
const router = useRouter()
const userStore = useUserStoreOut()

const props = defineProps<{
  menuData: RouteRecordRaw[]
}>()

console.log('===========menuData', props?.menuData)

const menuClick = (menu: RouteRecordRaw) => {
  router.push({
    name: menu.name
  })
}

const logout = () => {
  userStore.removeToken()
  userStore.setUserInfo(null)
  router.push({
    name: VIEW_LOGIN_NAME
  })
}

watchEffect(() => {
  if (router.currentRoute.value) {
    currentPathKey.value = '/' + router.currentRoute.value.fullPath.split('/')[1]
  }
})
</script>
<style lang="less" scoped>
.router-link {
  color: #111111;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
}

.comp-top-right {
  display: flex;

  .router-link-active {
    &:extend(.router-link);
    color: @primary-color;
    font-weight: 600;
    border-bottom: 2px solid @primary-color;
  }
}
</style>
