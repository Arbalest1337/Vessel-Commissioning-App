<template>
  <div class="bg-[#006EFF] text-white p-[48rpx] h-[280rpx] box-border">
    <div class="flex gap-3 w-full">
      <div class="min-w-0">
        <div
          class="text-[16px] font-bold mb-1 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ company.nameZh }}
        </div>
        <div class="opacity-80 whitespace-nowrap text-[13px]">
          工单互联助力船舶设备长效运维
        </div>
      </div>

      <div
        @click="showUserMenu = true"
        class="flex items-center gap-1 ml-auto shrink-0 grow-0"
      >
        <div
          class="rounded-[50%] bg-white flex items-center justify-center p-1"
        >
          <wd-icon color="#000" name="user" />
        </div>
        <div>
          {{ user.nickname }}
        </div>
      </div>

      <UserMenu v-model:open="showUserMenu" />
    </div>
  </div>
</template>
<script setup>
const showUserMenu = ref(false)
import UserMenu from "../UserMenu.vue"
import { storeToRefs } from "pinia"
import { useUserStore } from "../../store/user"
const userStore = useUserStore()
const { company, user } = storeToRefs(userStore)
</script>

<style lang="scss" scoped></style>
