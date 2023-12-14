<template>
  <a-modal v-model:visible="applicationStore.$state.createModalVisable" title="创建应用" @ok="handleOk"
    @cancel="handleCancel">
    <a-form ref="formRef" :model="formState" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
      <a-form-item ref="name" label="应用名称" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="应用类型" name="type">
        <a-select v-model:value="formState.type" placeholder="please select your zone">
          <a-select-option :value="item.value" v-for="item in applicationTypeList">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { useApplicationStore } from '@/store/module/application'
import { reactive, ref, toRaw, UnwrapRef } from 'vue'
import { applicationTypeList as typeList, ApplicationType } from '@/enums/application'
import { createApplication } from '@/api/request'

interface FormState {
  name: string
  type: string | number
}

const applicationTypeList = typeList.filter((item) => item.value !== ApplicationType.全部应用类型)
const applicationStore = useApplicationStore()
const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  type: applicationTypeList[0].value
})
const rules = {
  name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }]
}

const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState))
      createApplication({ name: formState?.name, type: formState?.type }).then(res => {
        if (res.success) {
          applicationStore.getAllApplicationList()
          formRef.value.resetFields()
          applicationStore.setCreateApplicationModal(false)
        }
      })
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log('error', error)
    })
}

const handleCancel = () => {
  applicationStore.setCreateApplicationModal(false)
}
</script>
<script lang="ts">
export default {
  name: 'createApplicationModal'
}
</script>
<style lang="less" scoped></style>
        