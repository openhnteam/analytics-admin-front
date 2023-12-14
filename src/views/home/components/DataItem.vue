<template>
  <div class="data-item-content">
    <div :class="props?.isHight ? 'num-height' : 'num'">{{ props?.count.toLocaleString() }}</div>
    <div class="sub-title">{{ props?.subTitle }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
interface Props {
  count: number
  subTitle: string
  isHight?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  subTitle: '',
  isHight: false
})
</script>
    <script lang="ts">
export default {
  name: 'DataItem'
}
</script>
<style lang="less" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.num {
  &:extend(.center);
  margin-bottom: 0.5rem;
  height: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111111;
}

.data-item-content {
  // width: 12.75rem;
  height: 5.875rem;
  background: #f5f5f5;
  padding: 1rem 0;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  .num-height {
    &:extend(.num);
    color: #ff8300;
  }
  .sub-title {
    &:extend(.center);
    height: 1.375rem;
    font-size: 0.875rem;
    color: #999999;
  }
}
</style>
      