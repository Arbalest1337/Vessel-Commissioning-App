<template>
  <div class="p-3">
    <OrderQuestionList :orderId />
  </div>
</template>
<script setup>
import OrderQuestionList from "@/components/OrderQuestion/QuestionList.vue"
import { onLoad } from "@dcloudio/uni-app"
const orderId = ref("")

onLoad((option) => {
  orderId.value = option.orderId
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
