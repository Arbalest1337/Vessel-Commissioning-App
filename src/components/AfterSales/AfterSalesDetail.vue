<template>
  <div
    class="transition-opacity duration-500 flex flex-col gap-3 p-3 pb-[160rpx] box-border"
    :class="loading ? 'opacity-0' : 'opacity-100'"
  >
    <Tips />
    <StatusBar />
    <Base />
    <Engineer />
    <Comments :comments="afterSalesOrder.comments" />
  </div>
  <AfterSalesActions
    :afterSalesOrder
    @updated="getDetail"
    class="p-3 fixed bottom-0 left-0 w-full z-99"
  />
</template>
<script setup>
import apis from "@/api"
import Tips from "../Order/OrderDetail/Tips.vue"
import StatusBar from "./Detail/StatusBar.vue"
import Base from "./Detail/Base.vue"
import Engineer from "./Detail/Engineer.vue"
import AfterSalesActions from "./AfterSalesActions.vue"
import Comments from "./Comment/Comments.vue"

onBeforeMount(() => {
  getDetail()
})

const afterSalesOrderId = defineModel("afterSalesOrderId", { default: "" })

const afterSalesOrder = ref({})
provide("afterSalesOrder", afterSalesOrder)

const loading = ref(false)
const getDetail = async () => {
  try {
    loading.value = true
    const res = await apis.afterSales.detail(afterSalesOrderId.value)
    afterSalesOrder.value = res
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
