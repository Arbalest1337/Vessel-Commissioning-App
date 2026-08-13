<template>
  <CommentItem v-if="list.first" :comment="list.first">
    <div class="text-[16px] pb-2">售后问题</div>
  </CommentItem>
  <CommentItem v-for="item in list.rest" :comment="item">
    <div class="text-[16px] pb-2">反馈记录</div>
  </CommentItem>
</template>
<script setup>
import CommentItem from "./CommentItem.vue"
const comments = defineModel("comments", { default: [] })
const list = computed(() => {
  const [first, ...rest] = comments.value
  return {
    first,
    rest,
  }
})
</script>

<style lang="scss" scoped></style>
