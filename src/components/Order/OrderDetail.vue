<template>
  <div
    class="transition-opacity duration-500 flex flex-col gap-3 p-3 pb-[160rpx]"
    :class="loading ? 'opacity-0' : 'opacity-100'"
  >
    <Tips />
    <StatusBar />
    <Base />
    <Engineer />
    <Checkpoints />
  </div>
  <OrderActions
    :order
    @updated="getDetail"
    class="p-3 fixed bottom-0 left-0 w-full z-99"
  />
</template>
<script setup>
import OrderActions from "./OrderActions.vue"
import apis from "@/api"
import Checkpoints from "./OrderDetail/Checkpoints.vue"
import StatusBar from "./OrderDetail/StatusBar.vue"
import Base from "./OrderDetail/Base.vue"
import Tips from "./OrderDetail/Tips.vue"
import Skeleton from "./OrderDetail/Skeleton.vue"
import Engineer from "./OrderDetail/Engineer.vue"
const orderId = defineModel("orderId", { default: "" })

const order = ref({})
provide("order", order)

onBeforeMount(() => {
  getDetail()
})

const loading = ref(false)
const getDetail = async () => {
  try {
    loading.value = true

    const res = await apis.order.detail(orderId.value)
    order.value = res
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
