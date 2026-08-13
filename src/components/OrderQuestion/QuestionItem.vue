<template>
  <div
    @click="goQuestionDetail"
    class="shadow flex flex-col gap-3 bg-white rounded-[4px] shadow px-3 py-3 obx-border"
  >
    <div class="flex items-center">
      <div class="text-[32rpx] font-bold">
        {{ question.no }}
      </div>
      <div class="ml-auto">
        {{ QuestionStatusMap[question.status] }}
      </div>
    </div>
    <div class="py-3">
      {{ question.content }}
    </div>

    <div class="flex items-center text-gray-500">
      <div>反馈人：{{ question.createdByMember.user.nickname }}</div>
      <div class="ml-auto">
        {{ dayjs(question.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { dayjs } from "wot-design-uni"
import { QuestionStatusMap } from "../../enum"
const question = defineModel("question", { default: {} })

const goQuestionDetail = () => {
  uni.navigateTo({
    url: `/pages/order-question/detail?questionId=${question.value.id}`,
  })
}
</script>

<style lang="scss" scoped></style>
