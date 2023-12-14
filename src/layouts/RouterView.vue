<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition ? `${route.meta.transition}` : 'fade'" mode="out-in">
      <div>
        <keep-alive :include="include">
          <component :is="Component" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { Ref } from 'vue'
import { useApplicationStore } from '@/store/module/application'

export default defineComponent({
  name: 'CustomRouterView',
  setup() {
    let include: Ref<string[]> = ref([])
    const route = useRoute()
    const applicationStore = useApplicationStore()
    watchEffect(() => {
      if (typeof route.name === 'string' && !include.value.includes(route.name) && !(route.meta?.keepAlive === false)) {
        include.value.push(route.name)
      }
    })
    return {
      include,
      applicationStore
    }
  }
})
</script>
