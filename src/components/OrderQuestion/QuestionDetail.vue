<template>
  <div class="flex flex-col gap-3 pb-[280rpx]">
    <QuestionBase :question />
    <QuestionAnswers :answers />

    <QuestionActions
      v-if="question.status === QuestionStatus['反馈中']"
      @updated="getQuestion"
      :question
      class="fixed bottom-0 left-0 w-full"
    />
  </div>
</template>
<script setup>
import QuestionActions from "./QuestionActions.vue"
import apis from "@/api"
import QuestionAnswers from "./QuestionAnswers.vue"
import QuestionBase from "./QuestionBase.vue"
import { onMounted } from "vue"
import { QuestionStatus } from "../../enum/index.ts"

const questionId = defineModel("questionId", { default: "" })
const loading = ref(false)

const question = ref({})

const answers = computed(() => question.value?.answers ?? [])

onMounted(() => {
  getQuestion()
})

const getQuestion = async () => {
  try {
    loading.value = true
    uni.showLoading()
    const res = await apis.question.detail(questionId.value)
    question.value = res
  } finally {
    loading.value = false
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped></style>
