<template>
  <div>
    <base-wrap>
      <template #form>
        <div class="flex flex-col justify-center">
          <div class="font-bold text-4xl form-title">创建你的账号</div>
          <a-form ref="formRef" :model="formState" :rules="rules" class="!mt-8">
            <a-form-item name="userName" class="form-input">
              <a-input v-model:value="formState.userName" class="h-12 text-xs !border-none" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item name="password">
              <a-input
                v-model:value="formState.password"
                :type="showPass ? 'text' : 'password'"
                class="h-12 text-xs !border-none form-input"
                placeholder="请输入新密码"
              >
                <template #suffix>
                  <img
                    v-show="showPass"
                    class="cursor-pointer"
                    src="@/assets/images/login/show-password.png"
                    alt=""
                    @click="showPass = false"
                  />
                  <img
                    v-show="!showPass"
                    class="cursor-pointer"
                    src="@/assets/images/login/hide-password.png"
                    alt=""
                    @click="showPass = true"
                  />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="newPassword">
              <a-input
                v-model:value="formState.newPassword"
                :type="showNewPass ? 'text' : 'password'"
                class="h-12 text-xs !border-none form-input"
                placeholder="请再次输入密码"
              >
                <template #suffix>
                  <img
                    v-show="showNewPass"
                    class="cursor-pointer"
                    src="@/assets/images/login/show-password.png"
                    alt=""
                    @click="showNewPass = false"
                  />
                  <img
                    v-show="!showNewPass"
                    class="cursor-pointer"
                    src="@/assets/images/login/hide-password.png"
                    alt=""
                    @click="showNewPass = true"
                  />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button class="w-full !h-12 mt-8 !text-base" type="primary" :loading="loading" @click="handleSubmit">
                提交
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </template>
    </base-wrap>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form/interface'
import { useUserStoreOut } from '@/store/module/user'
import { createAccount } from '@/api/request/user'
import BaseWrap from '../components/BaseWrap.vue'
import { VIEW_HOME_NAME } from '@/enums/view'

interface FormState {
  userName: string
  password: string
  newPassword: string
}
const userStore = useUserStoreOut()
const router = useRouter()

const formState = ref<FormState>({
  userName: '',
  password: '',
  newPassword: ''
})
const formRef = ref()
const equalPassword = (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码')
  }
  if (value !== formState.value.password) {
    return Promise.reject('再次输入的密码不一致')
  }
  return Promise.resolve()
}
const rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  newPassword: [
    { required: true, message: '', trigger: 'change' },
    { validator: equalPassword, trigger: 'change' }
  ]
})
const showPass = ref(false)
const showNewPass = ref(false)
const loading = ref(false)

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      handleRegister()
    })
    .catch(() => {
      // 表单验证不通过
    })
}
const handleRegister = () => {
  loading.value = true
  createAccount({
    userName: formState.value.userName,
    password: formState.value.password
  })
    .then((res) => {
      if (!res.success) {
        message.error(res.message || '请求报错')
        return
      }
      userStore.setToken(res.data.token)
      router.replace({
        name: VIEW_HOME_NAME
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style lang="less" scoped>
@import '../style/common.less';
</style>
