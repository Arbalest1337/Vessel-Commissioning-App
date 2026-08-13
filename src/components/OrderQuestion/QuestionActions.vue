<template>
  <div class="flex flex-col gap-2 bg-white">
    <div class="grow-1 shrink-1 w-full pt-1 px-4 box-border">
      <wd-textarea
        custom-textarea-style="max-height: 300rpx;"
        v-model="form.content"
        auto-height
        placeholder="填写反馈内容"
      />
    </div>
    <div class="flex items-center justify-center gap-8 py-1 shrink-0 grow-0">
      <wd-button plain @click="applyClose">申请关闭</wd-button>
      <wd-button @click="addAnswer">我要反馈</wd-button>
    </div>
  </div>
</template>
<script setup>
import apis from "@/api"
import { needConfirm, toast } from "../../utils"
const loading = ref(false)
const question = defineModel("question", { default: {} })

const emit = defineEmits(["updated"])

const applyClose = async () => {
  await needConfirm({
    title: "申请关闭",
    content: "是否确认申请关闭该问题？",
  })
  try {
    loading.value = true
    await apis.question.requestClose({
      questionId: question.value.id,
    })

    setTimeout(() => {
      toast("已申请关闭")
    }, 100)
    emit("updated")
  } finally {
    loading.value = false
  }
}

const form = reactive({
  content: "",
})

const addAnswer = async () => {
  if (!form.content) {
    toast("请输入反馈内容")
    return
  }
  try {
    loading.value = true
    await apis.answer.create({
      ...form,
      orderId: question.value.orderId,
      questionId: question.value.id,
    })
    form.content = ""

    setTimeout(() => {
      toast("反馈已提交")
    }, 100)
    emit("updated")
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
