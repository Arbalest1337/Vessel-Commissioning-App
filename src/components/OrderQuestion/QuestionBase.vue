<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="text-[16px] pb-2">基本信息</div>
    <div class="flex flex-col gap-3">
      <div v-for="item in cells" class="flex flex-nowrap gap-8">
        <div class="shrink-0 grow-0">{{ item.label }}：</div>
        <div class="ml-auto text-right">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { QuestionStatusMap } from "../../enum"
import { dayjs } from "wot-design-uni"
const question = defineModel("question", { default: {} })

const cells = computed(() => [
  {
    label: "检查点",
    value:
      question.value?.orderCheckpoint?.descriptionEn +
      " " +
      question.value?.orderCheckpoint?.description,
  },
  { label: "问题状态", value: QuestionStatusMap[question.value.status] },
  { label: "反馈问题", value: question.value.content },
  { label: "反馈号", value: question.value.no },
  {
    label: "反馈人",
    value:
      question.value.createdByMember?.user?.nickname +
      " " +
      question.value.createdByMember?.user?.phone,
  },
  {
    label: "反馈时间",
    value: dayjs(question.value.createdAt).format("YYYY-MM-DD HH:mm:ss"),
  },
])
</script>

<style lang="scss" scoped></style>
