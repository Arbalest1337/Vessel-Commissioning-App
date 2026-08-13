<template>
  <div class="relative h-full">
    <AfterSalesDetail :afterSalesOrderId />
  </div>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app"
import AfterSalesDetail from "../../components/AfterSales/AfterSalesDetail.vue"
const afterSalesOrderId = ref("")
onLoad((option) => {
  afterSalesOrderId.value = option.id
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
