<template>
  <div
    class="h-full text-center flex flex-col items-center justify-center gap-6"
  >
    <div>
      <Logo />
      <div class="text-[22px] font-bold">欢迎使用船联运维APP</div>
      <div class="text-[rgba(74,74,74,1)] text-[16px]">
        工具在手，工单无忧，助力您高效管理！
      </div>
    </div>

    <div class="pt-4 mb-[20vh] w-[240px]">
      <wd-input
        type="text"
        prefix-icon="user"
        v-model="form.usernameOrPhone"
        placeholder="请输入账号/手机号"
        size="large"
      />

      <wd-input
        type="password"
        prefix-icon="lock-on"
        v-model="form.password"
        placeholder="请输入密码"
        size="large"
      />

      <view class="my-5">
        <wd-button
          :loading
          type="primary"
          size="large"
          :disabled="!form.usernameOrPhone || !form.password"
          @click="handleSubmit"
          block
          >提交</wd-button
        >
      </view>
    </div>
  </div>
  <SelectRole v-model:open="openSelectRole" />
</template>
<script setup>
import { useUserStore } from "../../store/user.js"
import { toast } from "../../utils/index.js"
import Logo from "../../components/Logo.vue"
import SelectRole from "../../components/SelectRole.vue"

const openSelectRole = ref(false)
const userStore = useUserStore()

const form = reactive({
  usernameOrPhone: "",
  password: "",
})

const loading = ref(false)

const doValidate = async () => {
  return new Promise((resolve, reject) => {
    if (!form.password.trim()) {
      toast("请输入登录密码")
      reject()
    }

    if (!form.usernameOrPhone.trim()) {
      toast("请输入登录账号或手机号")
      reject()
    }

    resolve()
  })
}
const handleSubmit = async () => {
  await doValidate()
  try {
    loading.value = true
    await userStore.login(form)
    openSelectRole.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}
</style>
