<template>
  <div class="page flex flex-col">
    <Header class="shrink-0 grow-0" />
    <div class="px-4 relative top-[-100rpx] h-[calc(100%-180rpx)]">
      <div
        class="flex flex-col bg-white h-full rounded-t-[8px] overflow-hidden"
      >
        <div class="grow-0 shrink-0">
          <wd-segmented
            :options="list"
            v-model:value="orderType"
            custom-style="--wot-segmented-item-color-active: #ff4400;"
          />
        </div>

        <template v-if="orderType === '调试单'">
          <OrderList class="!h-[calc(100%-36px)]" />
        </template>

        <template v-if="orderType === '售后单'">
          <AfterSalesList />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "../../components/Header/Header.vue"
import OrderList from "../../components/Order/OrderList.vue"
import AfterSalesList from "../../components/AfterSales/AfterSalesList.vue"

const active = ref("全部")
const orderType = ref("调试单")
const list = ["调试单", "售后单"]
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}
.page {
  height: 100%;
  overflow: hidden;
}
</style>
