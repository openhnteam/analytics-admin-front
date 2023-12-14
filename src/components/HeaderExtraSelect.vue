<template>
  <div class="custom-select">
    <span v-if="props.prefix">{{ props.prefix }}</span>
    <a-select
      v-if="props.options?.length"
      :class="props.selectorClass"
      :value="props.value"
      @change="onSelectorChange"
      :options="props.options"
      :allowClear="allowClear"
      :showSearch="props.showSearch"
    />
  </div>
</template>
<script lang="ts" setup>
interface Option {
  value: string | number
  label: string
}
interface Props {
  allowClear?: boolean
  prefix?: string
  selectorClass?: string
  options: Option[]
  value: string | number
  showSearch?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  prefix: '',
  selectorClass: '',
  allowClear: false,
  showSearch: false
})
const emit = defineEmits(['update:value'])

const onSelectorChange = (value: string) => {
  emit('update:value', value)
}
</script>
<style lang="less" scoped>
.custom-select {
  transition: all ease 0.3s;
  border-width: 1px;
  border-color: @border-color-base;
  border-radius: @border-radius-base;
  @apply inline-block h-32px pl-4;
  &:hover {
    border-color: #ffb066;
  }
  :deep(.ant-select) {
    vertical-align: 1px;
    .ant-select-selector {
      @apply pl-4;
    }
    &:not(.ant-select-customize-input) .ant-select-selector {
      @apply border-none h-30px;
    }
    &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      box-shadow: none;
      // box-shadow: 0 0 0 2px rgb(251 146 60 / 20%);
    }
    .ant-select-selection-search input:focus {
      border: none;
      box-shadow: none;
    }
  }
  & > span {
    color: #bfbfbf;
    @apply inline-block h-30px leading-30px;
  }
}
</style>
