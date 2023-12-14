<template>
  <div class="statistics-content" v-if="!applicationStore.loadingApplication">
    <div class="route-menu-content">
      <SelectAppDropdown></SelectAppDropdown>
      <a-menu v-model:selectedKeys="menuSelectKey" v-model:openKeys="menuOpenKeys" mode="inline" :class="['route-menu']">
        <template v-for="item in menuList">
          <a-menu-item :key="`${item?.redirect}`"
            v-if="!(item.children && item.children.length > 0) || item?.meta?.notIsLeaf" @click="menuClick(item)">
            <div :class="menuSelectKey?.includes(`${item?.redirect}`) ? 'menu-item-active' : 'menu-item'">
              <MenuIcon :iconName="`${item.meta?.iconName}`" :isHight="menuSelectKey?.includes(`${item.redirect}`)">
              </MenuIcon>
              <span>{{ item?.meta?.title }}</span>
            </div>
          </a-menu-item>
          <a-sub-menu v-else :key="item.path">
            <template #title>
              <div class="sub-menu-title">
                <MenuIcon :iconName="`${item.meta?.iconName}`" :isHight="menuOpenKeys?.includes(item?.path)">
                </MenuIcon>
                <span>{{ item?.meta?.title }}</span>
              </div>
            </template>
            <a-menu-item :key="childItem.path" v-for="childItem in item?.children || []" @click="menuClick(childItem)">
              <div :class="menuSelectKey?.includes(childItem?.path) ? 'sub-menu-item-active' : 'sub-menu-item'">
                <span>{{ childItem?.meta?.title }}</span>
              </div>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </div>
    <div :class="['flex-1 transition-all pb-4 ml-2 mr-2', 'div-scroll']">
      <CustomRouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import MenuIcon from '@/views/statistics/components/MenuIcon.vue'
import SelectAppDropdown from '@/views/statistics/components/SelectDropdown.vue'
import { RouteRecordRaw } from 'vue-router'
import CustomRouterView from '@/layouts/RouterView.vue'
import { VIEW_STATISTICS_NAME } from '@/enums/view'
import { useApplicationStore } from '@/store/module/application'
import cloneDeep from 'lodash.clonedeep'

const applicationStore = useApplicationStore()
const menuSelectKey = ref<string[]>([])
const menuOpenKeys = ref<string[]>([])
const menuList = ref<Array<RouteRecordRaw>>([])
const router = useRouter()
const route = useRoute()

const menuClick = (val: RouteRecordRaw) => {
  menuSelectKey.value = [String(val.path)]
  router.push({
    name: val?.name
  })
}

watchEffect(() => {
  const routeObj = router.currentRoute.value;
  if (routeObj) {
    menuSelectKey.value = [String(routeObj.path)]
    if (routeObj?.meta?.notIsLeaf) {
      menuOpenKeys.value = []
    } else {
      const list = routeObj.path?.split('/')
      console.log('123', list)
      menuOpenKeys.value = [`/${list[1]}/${list[2]}`]
    }
  }
})

const detailsMenuList = (val: Array<RouteRecordRaw>) => {
  const type = applicationStore.currentApplicationItem.type
  const list = val.filter(item => {
    // @ts-ignore
    console.log('================item', item.name, item.meta?.isDisabled, type, item.meta?.isDisabled?.includes(type))
    // @ts-ignore
    if (item.meta?.isDisabled?.includes(type)) {
      return false
    } else {
      // @ts-ignore
      if (item?.children?.length > 0) {
        // @ts-ignore
        item.children = detailsMenuList(item.children)
      }
    }
    return true
  })
  return list
}

const getRoute = () => {
  const routes = router.getRoutes()
  routes?.map((item) => {
    if (item.name === VIEW_STATISTICS_NAME) {
      menuList.value = detailsMenuList(cloneDeep(item.children))
    }
    return item
  })
}

watch([() => applicationStore.currentApplicationID], () => {
  getRoute()
})

onMounted(() => {
  getRoute()
})
</script>
<script lang="ts">
export default {
  name: 'Statistics'
}
</script>
<style lang="less" scoped>
/deep/ .route-menu {
  padding: 0 8px;
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;

  li {
    padding: 0 !important;
    border-radius: 4px !important;
  }

  .ant-menu-submenu-title {
    padding-left: 18px !important;
  }

  .ant-menu-inline .ant-menu-submenu {
    .ant-menu-submenu-title {
      .ant-menu-title-content {
        color: #0052d9;
      }
    }
  }
}

.div-scroll {
  height: calc(100vh - 84px);
  overflow-y: scroll;
}

.menu-item {
  display: flex;
  align-items: center;
  background: #fff;
  color: #111111;
  border-radius: 4px;
  padding-left: 18px;

  span {
    margin-left: 8px;
  }
}

.menu-item-active {
  &:extend(.menu-item);
  background: #0052d9;
  color: #fff;

  span {
    margin-left: 8px;
  }
}

.sub-menu-item {
  &:extend(.menu-item);
  padding-left: 32px;

  span {
    margin-left: 8px;
  }
}

.sub-menu-item-active {
  &:extend(.menu-item-active);
  padding-left: 32px;

  span {
    margin-left: 8px;
  }
}

.statistics-content {
  display: flex;
  height: calc(100vh - 4rem);

  .route-menu-content {
    width: 14rem;
    background: #fff;

    .route-name {
      margin: 1rem 1.25rem;
      border-radius: 4px;
      background: #f5f5f5;
      height: 2.5rem;
      cursor: pointer;

      span {
        color: #111111;
        font-size: 14px;
        width: 135px;
        white-space: nowrap;
        /* 禁止换行 */
        overflow: hidden;
        /* 超出部分隐藏 */
        text-overflow: ellipsis;
        /* 文本超出宽度时显示省略号 */
      }
    }
  }

  .route-content {
    flex: 1;
  }
}

.sub-menu-title {
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
  }
}
</style>
  