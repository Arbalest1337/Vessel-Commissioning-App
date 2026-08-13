<template>
  <div class="flex gap-2 py-2">
    <div
      class="rounded-[50%] flex items-center justify-center h-[80rpx] w-[80rpx] shrink-0 text-white grow-0 bg-[#006EFF]"
    >
      <div class="font-bold text-[20rpx]">
        {{ answer.createdByMember.user.nickname[0] }}
      </div>
    </div>
    <div class="flex flex-col gap-1 grow-1 shrink-1 w-full">
      <div class="flex items-center gap-2">
        <div>{{ answer.createdByMember.user.nickname }}</div>
        <div class="ml-auto text-[12px] text-gray-500">
          {{ dayjs(answer.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </div>
      <div class="py-2 break-all">{{ answer.content }}</div>
    </div>
  </div>
</template>
<script setup>
import { dayjs } from "wot-design-uni"
const answer = defineModel("answer", { default: {} })
</script>

<style lang="scss" scoped></style>
