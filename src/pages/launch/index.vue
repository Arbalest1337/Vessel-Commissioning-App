<template>
  <div class="page flex flex-col justify-center text-center gap-[28vh]">
    <div class="flex flex-col items-center">
      <Logo />
      <div class="text-center font-bold text-[22px]">船联运维APP</div>
    </div>
    <div class="text-[18px]">
      <div>工具在手 工单无忧</div>
      <div>工单管理助手 助理高效管理</div>
    </div>
  </div>
</template>
<script setup>
import { sleep } from "../../utils/index.js"
import Logo from "../../components/Logo.vue"
import { onShow } from "@dcloudio/uni-app"
import { useUserStore } from "@/store/user"

const userStore = useUserStore()

onShow(() => {
  checkLogin()
})

const checkLogin = async () => {
  if (userStore.token) {
    await Promise.all([userStore.getUserInfo(), sleep(1500)])
    await userStore.getUserInfo()
    uni.navigateTo({ url: "/pages/index/index" })
  } else {
    await sleep(1500)
    uni.navigateTo({ url: "/pages/login/index" })
  }
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}
.page {
  height: 100%;
  background: linear-gradient(
    179.48deg,
    rgba(0, 110, 255, 0) 51.98%,
    rgba(1, 110, 255, 1) 117.79%
  );
}
</style>
