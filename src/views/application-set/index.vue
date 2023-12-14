<template>
    <common-page class="view-setting-app">
        <template #headerTitle>应用设置</template>
        <template #headerExtra> </template>
        <template #default>
            <a-card class="enter-y" hoverable :loading="applicationStore.loadingApplication">
                <template #title> 应用基础信息 </template>
                <template #extra>
                    <a-tooltip title="编辑" v-if="!isEdit">
                        <svg @click="isEdit = true" t="1700451332382" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2301" width="16" height="16">
                            <path
                                d="M862.709333 116.042667a32 32 0 1 1 45.248 45.248L455.445333 613.813333a32 32 0 1 1-45.258666-45.258666L862.709333 116.053333zM853.333333 448a32 32 0 0 1 64 0v352c0 64.8-52.533333 117.333333-117.333333 117.333333H224c-64.8 0-117.333333-52.533333-117.333333-117.333333V224c0-64.8 52.533333-117.333333 117.333333-117.333333h341.333333a32 32 0 0 1 0 64H224a53.333333 53.333333 0 0 0-53.333333 53.333333v576a53.333333 53.333333 0 0 0 53.333333 53.333333h576a53.333333 53.333333 0 0 0 53.333333-53.333333V448z"
                                fill="#000000" p-id="2302"></path>
                        </svg>
                    </a-tooltip>
                </template>
                <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 16 }">
                    <a-form-item ref="name" label="应用名称" name="name">
                        <a-input v-if="isEdit" v-model:value="applicationStore.currentApplicationItem.name" />
                        <span v-else>{{ applicationStore.currentApplicationItem.name }}</span>
                    </a-form-item>
                    <a-form-item label="应用类型" name="type">
                        <a-select v-if="isEdit" v-model:value="applicationStore.currentApplicationItem.type"
                            placeholder="please select your zone">
                            <a-select-option :value="item.value" v-for="item in applicationTypeList">
                                {{ item.label }}
                            </a-select-option>
                        </a-select>
                        <span v-else>{{ getApplicationType(applicationStore.currentApplicationItem.type) }}</span>
                    </a-form-item>
                    <a-form-item label="应用KEY" name="key">
                        <span>{{ applicationStore.currentApplicationItem.key }}</span>
                    </a-form-item>
                    <a-form-item label="应用ID" name="appId">
                        <span>{{ applicationStore.currentApplicationItem.appId }}</span>
                    </a-form-item>
                    <a-form-item label="应用盐值" name="salt">
                        <span>{{ applicationStore.currentApplicationItem.salt }}</span>
                    </a-form-item>
                </a-form>
                <divt v-if="isEdit" class="float-right">
                    <a-button @click="onCancel">取消</a-button>
                    <a-button @click="onSubmit" type="primary" class="ml-4" :loading="isLoading">保存</a-button>
                </divt>
            </a-card>
        </template>
    </common-page>
</template>
  
<script lang="ts" setup>
import { useApplicationStore } from '@/store/module/application'
import { ref } from 'vue'
import { applicationTypeList as typeList, ApplicationType } from '@/enums/application'
import { updateApplication } from '@/api/request'
import { message } from 'ant-design-vue'

const applicationTypeList = typeList.filter((item) => item.value !== ApplicationType.全部应用类型)
const applicationStore = useApplicationStore()
const isLoading = ref<boolean>(false)
const formRef = ref()
const isEdit = ref<boolean>(false)
let formState = ref<{ name: string, type: number | string }>({
    name: applicationStore.currentApplicationItem.name,
    type: applicationStore.currentApplicationItem.type
})

const rules = {
    name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }]
}

const getApplicationType = (val: string | number) => {
    return applicationTypeList.find(item => item.value === val)?.label
}

const onCancel = () => {
    isEdit.value = false
}

const onSubmit = () => {
    isLoading.value = true
    const data = applicationStore.currentApplicationItem
    updateApplication({ appId: data.appId, name: data.name, type: data.type }).then(res => {
        if (res.success) {
            applicationStore.updateApplicationInfo(data.appId, data.name, data.type)
            message.success('保存成功')
        }
    }).finally(() => {
        isLoading.value = false
    })
}

watch([applicationStore.currentApplicationItem], () => {
    formState.value = {
        name: applicationStore.currentApplicationItem.name,
        type: applicationStore.currentApplicationItem.type,
    }
}, {
    deep: true
})
</script>
<script lang="ts">
export default {
    name: 'ViewApplicationSet'
}
</script>
<style lang="less" scoped></style>
  