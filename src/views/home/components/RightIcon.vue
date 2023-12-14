<template>
  <svg
    v-if="!props?.isSelect"
    t="1698719967419"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4011"
    width="14"
    height="14"
  >
    <path
      d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
      p-id="4012"
      fill="#999999"
    ></path>
  </svg>
  <svg
    v-if="props?.isSelect"
    t="1698719967419"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4011"
    width="14"
    height="14"
  >
    <path
      d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
      p-id="4012"
      fill="#0052D9"
    ></path>
  </svg>
</template>
<script lang="ts" setup>
interface Props {
  isSelect?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isSelect: false
})
</script>
    <script lang="ts">
export default {
  name: 'RightIcon'
}
</script>
    <style lang="less" scoped>
.application-item-content {
  width: 28.5rem;
  padding: 1rem 1.25rem;
}
</style>
      