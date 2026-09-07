<template>
  <div class="flex flex-col gap-3 bg-white">
    <QuestionItem v-for="item in questions" :question="item" />
    <NoData v-if="!loading && !questions.length" />
    <LoadMore :loading @load="getQuestions" />
  </div>
</template>
<script setup>
import QuestionItem from "./QuestionItem.vue"
import NoData from "../NoData.vue"
import LoadMore from "../LoadMorel/LoadMore.vue"
import apis from "@/api"
const orderId = defineModel("orderId", { default: "" })
const loading = ref(false)

const questions = defineModel("questions", { default: [] })
const cursor = computed(() => questions.value[questions.value.length-1]?.id)

const params = reactive({
  cursor,
  orderId,
  pageSize: 20,
})

const getQuestions = async () => {
  try {
    loading.value = true
    const res = await apis.question.query({ ...params })
    questions.value = [...questions.value, ...res]
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
