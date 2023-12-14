<template>
  <div>
    <a-page-header v-if="showHeader" :ghost="props.isPageGhost" class="enter-x !mb-4" :class="props.headerClass">
      <template #title>
        <slot name="headerTitle"></slot>
      </template>
      <template #extra>
        <slot name="headerExtra"></slot>
      </template>
      <slot name="headerContent"></slot>
    </a-page-header>
    <div class="clear-both" :class="props.contentClass">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  isPageGhost?: boolean
  showHeader?: boolean
  headerClass?: string
  contentClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  isPageGhost: false,
  showHeader: true,
  headerClass: '',
  contentClass: ''
})
</script>
<style lang="less" scoped>
:deep(.ant-page-header) {
  @apply px-4 py-3;
  .ant-page-header-heading-title {
    color: @text-color;
    @apply text-base font-medium;
  }
  .ant-page-header-heading-extra {
    @apply mt-6px;
    & > * {
      @apply ml-4 !align-middle;
    }
    & > .anticon {
      @apply h-32px !text-xl;
      svg {
        @apply align-middle;
      }
    }
  }
}
</style>
