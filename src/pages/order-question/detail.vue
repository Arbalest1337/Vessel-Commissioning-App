<template>
  <div class="p-3">
    <QuestionDetail :questionId />
  </div>
</template>
<script setup>
import QuestionDetail from "../../components/OrderQuestion/QuestionDetail.vue"
import { onLoad } from "@dcloudio/uni-app"
const questionId = ref("")

onLoad((option) => {
  questionId.value = option.questionId
})
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(
    179.83deg,
    rgba(0, 110, 255, 1) 11.1%,
    rgba(255, 255, 255, 0) 99.65%
  );
}
</style>
