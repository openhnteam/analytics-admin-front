<template>
  <a-dropdown :trigger="['click']">
    <div :class="['route-name', 'center-global']">
      <span>{{ applicationStore?.currentApplicationName || '--' }}</span>
      <svg t="1698821759829" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="6363" width="12" height="8">
        <path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="6364" fill="#666666"></path>
      </svg>
    </div>
    <template #overlay>
      <div class="menu-item-content">
        <div v-for="item in applicationStore.applicationList" :key="`${item.appId}`"
          :class="applicationStore?.currentApplicationName === item.name ? 'active-item' : 'item'"
          @click="changeApplicationClick(item)">
          {{ item.name }}
        </div>
      </div>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
import { useApplicationStore } from '@/store/module/application'
import { AllApplicationType } from '@/api/model'

const applicationStore = useApplicationStore()
const router = useRouter()

const changeApplicationClick = (val: AllApplicationType) => {
  applicationStore.setCurrentApplicationID(val.appId)
  applicationStore.setCurrentApplicationName(val.name)
  router.push({
    name: 'ViewAnalyticsOverviewIndex'
  })
}
</script>
<script lang="ts">
export default {
  name: 'SelectAppDropdown'
}
</script>
<style lang="less" scoped>
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

.menu-item-content {
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .active-item {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 32px;
    cursor: pointer;
    background-color: #0052d9;
    color: #fff;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  .item {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 32px;
    cursor: pointer;

    &:hover {
      background-color: #F5F5F5;
    }
  }
}
</style>
    