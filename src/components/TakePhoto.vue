<template>
  <wd-button type="primary" plain hairline v-bind="$attrs" @click="onUpload">
    <slot>上传</slot>
  </wd-button>
</template>
<script setup>
import { takePhoto, doUpload } from "@/utils/index.js"

const emit = defineEmits(["uploaded"])
const onUpload = async () => {
  const tempUrl = await takePhoto()
  const path = await doUpload(tempUrl, "signature_take_photo")
  emit("uploaded", path)
}
</script>

<style lang="scss" scoped></style>
