<template>
  <common-page class="view-custom-overview">
    <template #headerTitle>
      <template v-if="!showManagment">
        自定义事件概览
      </template>
      <template v-else>
        <div :class="['center-global', 'managment-title']" @click="showManagmentEmit(false)">
          <svg t="1699426200930" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="15451" width="16" height="16">
            <path
              d="M929.70745 487.72513 167.942967 487.72513l358.793666-318.918493c12.390191-11.012821 13.505595-29.982872 2.493797-42.37204-11.010775-12.388145-29.979802-13.506619-42.369993-2.492774L74.839499 490.168786c-6.407943 5.695722-10.073426 13.859659-10.073426 22.432918 0 8.573259 3.665483 16.737196 10.073426 22.432918l412.019914 366.227985c5.717212 5.082762 12.83533 7.581676 19.926842 7.581676 8.275477-0.002047 16.515139-3.403516 22.443152-10.07445 11.012821-12.389168 9.897418-31.359218-2.493797-42.37204L179.893136 548.100196l749.814314 0c16.575514 0 30.013571-13.612019 30.013571-30.187533S946.283987 487.72513 929.70745 487.72513z"
              fill="#272636" p-id="15452"></path>
          </svg>
          <span>事件管理</span>
        </div>
      </template>
    </template>
    <template #default>
      <OverviewTable v-if="!showManagment" @showManagmentEmit="showManagmentEmit"></OverviewTable>
      <ManagmentTable v-else></ManagmentTable>
    </template>
  </common-page>
</template>
<script lang="ts" setup>
import OverviewTable from '@/views/event/overview/components/OverviewTable.vue'
import ManagmentTable from '@/views/event/overview/components/ManagmentTable.vue';

const showManagment = ref<boolean>(false)

const showManagmentEmit = (val: boolean) => {
  showManagment.value = val
}
</script>

<script lang="ts">
export default {
  name: 'EventOverview'
}
</script>
<style lang="less" scoped>
.view-custom-overview {
  .managment-title {
    cursor: pointer;

    span {
      margin-left: 8px;
    }
  }
}
</style>