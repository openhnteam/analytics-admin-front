<template>
  <div class="filter-application-content">
    <a-select ref="select" v-model:value="applicationType" class="select-content" @change="applicationTypeChange">
      <a-select-option :value="item.value" v-for="item in applicationTypeList">{{ item.label }}</a-select-option>
    </a-select>
    <a-select ref="select" v-model:value="sortType" class="select-content" @change="applicationSortChange">
      <a-select-option :value="item.value" v-for="item in applicationSortList">{{ item.label }}</a-select-option>
    </a-select>
    <a-input class="search-content" placeholder="请输入应用名称" v-model:value="applicationName"
      @press-enter="applicationNameClick">
      <template #prefix>
        <svg t="1700189774456" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="7718" width="16" height="16">
          <path
            d="M862.609 816.955L726.44 680.785l-0.059-0.056a358.907 358.907 0 0 0 56.43-91.927c18.824-44.507 28.369-91.767 28.369-140.467 0-48.701-9.545-95.96-28.369-140.467-18.176-42.973-44.19-81.56-77.319-114.689-33.13-33.129-71.717-59.144-114.69-77.32-44.507-18.825-91.767-28.37-140.467-28.37-48.701 0-95.96 9.545-140.467 28.37-42.973 18.176-81.56 44.19-114.689 77.32-33.13 33.129-59.144 71.717-77.32 114.689-18.825 44.507-28.37 91.767-28.37 140.467 0 48.7 9.545 95.96 28.37 140.467 18.176 42.974 44.19 81.561 77.32 114.69 33.129 33.129 71.717 59.144 114.689 77.319 44.507 18.824 91.767 28.369 140.467 28.369 48.7 0 95.96-9.545 140.467-28.369 32.78-13.864 62.997-32.303 90.197-54.968 0.063 0.064 0.122 0.132 0.186 0.195l136.169 136.17c6.25 6.25 14.438 9.373 22.628 9.373 8.188 0 16.38-3.125 22.627-9.372 12.496-12.496 12.496-32.758 0-45.254z m-412.274-69.466c-79.907 0-155.031-31.118-211.534-87.62-56.503-56.503-87.62-131.627-87.62-211.534s31.117-155.031 87.62-211.534c56.502-56.503 131.626-87.62 211.534-87.62s155.031 31.117 211.534 87.62c56.502 56.502 87.62 131.626 87.62 211.534s-31.118 155.031-87.62 211.534c-56.503 56.502-131.627 87.62-211.534 87.62z"
            fill="#CECECE" p-id="7719"></path>
        </svg>
      </template>
    </a-input>
    <div @click="switchViewClick" class="switch-content">
      <svg v-if="!isListView" t="1699345007792" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="12349" width="24" height="24">
        <path
          d="M419.037 287.953h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM419.028 543.17h411.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
          fill="" p-id="12350"></path>
        <path d="M256.037 255.953m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="" p-id="12351"></path>
        <path d="M256.037 510.787m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="" p-id="12352"></path>
        <path d="M256.037 767.621m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="" p-id="12353"></path>
      </svg>
      <svg v-if="isListView" t="1699345198727" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="13650" width="24" height="24">
        <path
          d="M480 544v320H160V544h320z m384 0v320H544V544h320z m-448 64H224v192h192v-192z m384 0h-192v192h192v-192zM480 160v320H160V160h320z m384 0v320H544V160h320zM416 224H224v192h192V224z m384 0h-192v192h192V224z"
          fill="#383F4A" p-id="13651"></path>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { applicationTypeList as typeList } from '@/enums/application'
import { applicationSortList as sortList } from '@/enums/application'

const applicationType = ref<number>(0)
const sortType = ref<string>('')
const applicationName = ref<string>('')
const isListView = ref<boolean>(false)
const applicationTypeList = typeList
const applicationSortList = sortList

const emit = defineEmits(['changeViewEmit', 'applicationTypeChangeEmit', 'applicationSortChangeEmit', 'applicationNameClickEmit'])
const applicationTypeChange = (val: string) => {
  emit('applicationTypeChangeEmit', val)
}

const applicationSortChange = (val: string) => {
  emit('applicationSortChangeEmit', val)
}

const switchViewClick = () => {
  isListView.value = !isListView.value
  emit('changeViewEmit', isListView.value)
}

const applicationNameClick = () => {
  emit('applicationNameClickEmit', applicationName.value)
}
</script>
<script lang="ts">
export default {
  name: 'FilterApplication'
}
</script>
<style lang="less" scoped>
.filter-application-content {
  margin-right: 20px;
  width: 100%;
  display: flex;

  .select-content {
    width: 130px;
    margin-right: 8px;
  }

  .search-content {
    width: 224px;
    margin-right: 16px;
  }

  .switch-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    cursor: pointer;

    &:hover {
      background: #F3F3F3;
    }
  }
}</style>
  