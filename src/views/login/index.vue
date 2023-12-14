<template>
  <base-wrap>
    <template #form>
      <div class="flex flex-col justify-center">
        <div class="font-bold text-4xl form-title">请登录</div>
        <a-form ref="formRef" :model="formState" :rules="rules" class="!mt-8">
          <a-form-item name="userName" class="form-input">
            <a-input v-model:value="formState.userName" placeholder="请输入用户名" class="h-12 text-xs !border-none" />
          </a-form-item>
          <a-form-item name="password">
            <a-input
              v-model:value="formState.password"
              :type="showPass ? 'text' : 'password'"
              placeholder="请输入密码"
              class="h-12 text-xs !border-none form-input"
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
          <a-form-item name="code">
            <a-input
              v-model:value="formState.code"
              placeholder="请输入验证码"
              class="h-12 text-xs !border-none form-input"
            >
              <template #suffix>
                <div v-html="svg" @click="getImgCode" class="cursor-pointer"></div>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" :loading="loading" @click="loginClick" class="w-full !h-12 mt-8 !text-base"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </template>
  </base-wrap>
</template>
<script lang="ts" setup>
import BaseWrap from './components/BaseWrap.vue'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { getAccountCode, getAccountLogin } from '@/api/request/user'
import { useUserStoreOut } from '@/store/module/user'
import { VIEW_HOME_NAME } from '@/enums/view'
// type FormType = InstanceType<typeof Form>
interface IFormState {
  userName: string
  password: string
  code: string
}
const userStore = useUserStoreOut()
const router = useRouter()

const formState = ref<IFormState>({
  userName: '',
  password: '',
  code: ''
})
const rules = {
  name: [{ required: true, message: '请输入账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
}

const formRef = ref()
const svg = ref<string>('')
const key = ref<string>('')
const loading = ref(false)
const showPass = ref(false)

const loginClick = () => {
  formRef.value
    .validate()
    .then(() => {
      handleLogin()
    })
    .catch(() => {
      // 表单校验不通过
    })
}

const handleLogin = () => {
  const params = unref(formState)
  loading.value = true
  getAccountLogin({
    ...params,
    key: key.value
  })
    .then((res) => {
      if (!res.success) {
        message.error(res.message || '请求报错')
        formState.value.code = ''
        getImgCode()
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

const getImgCode = () => {
  getAccountCode().then((res) => {
    key.value = res.data.key
    svg.value = res.data.svg
  })
}

onMounted(() => {
  getImgCode()
})
</script>
<style lang="less" scoped>
@import './style/common.less';
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
