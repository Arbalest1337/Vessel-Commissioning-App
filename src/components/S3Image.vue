<template>
  <wd-img :width :height :src="S3Url(src)" :enable-preview="true" />
</template>
<script setup>
const width = defineModel("width", { default: 100 })
const height = defineModel("height", { default: 100 })
import { S3Url } from "../utils"
const src = defineModel("src", { default: "" })
</script>

<style lang="scss" scoped></style>
