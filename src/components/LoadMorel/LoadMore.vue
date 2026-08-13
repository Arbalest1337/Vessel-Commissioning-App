<template>
  <div
    class="load-more-container !h-10 flex flex-col items-center justify-center"
  >
  <div class="h-10">
    <wd-loading v-show="loading" size="30px" />

  </div>
  </div>
</template>
<script setup>
const loading = defineModel("loading", { default: false })
const noMore = defineModel("noMore", { default: false })
const emit = defineEmits(["load"])

const triggerLoad = () => {
  emit("load")
}

let observer = null
const instance = getCurrentInstance()
const initObserver = () => {
  if (observer) observer.disconnect()
  observer = uni.createIntersectionObserver(instance?.proxy)
  observer
    .relativeToViewport({ bottom: 50 })
    .observe(".load-more-container", (res) => {
      if (res.intersectionRatio > 0) {
        triggerLoad()
      }
    })
}

onMounted(() => {
  initObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style lang="scss" scoped></style>
