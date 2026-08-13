<template>
  <StatusTab :total v-model:active="params.queryStatus" />
</template>
<script setup>
import StatusTab from "./StatusTab.vue"

const params = defineModel("params", {
  default: {
    queryStatus: "all",
  },
})

const total = defineModel("total", {
  default: {
    pending: 0,
    inProgress: 0,
    completed: 0,
    all: 0,
  },
})
</script>

<style lang="scss" scoped></style>
