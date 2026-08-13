<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="text-[16px] pb-2">问询记录</div>
    <div class="flex flex-col">
      <AnswerItem v-for="item in answers" :answer="item" />
      <NoData v-if="!answers.length"/>
    </div>
  </div>
</template>
<script setup>
import AnswerItem from "./AnswerItem.vue"
import NoData from "../NoData.vue";
const answers = defineModel("answers", { default: [] })
</script>

<style lang="scss" scoped></style>
