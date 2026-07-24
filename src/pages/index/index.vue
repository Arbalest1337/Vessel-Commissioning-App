<template>
  <div class="page flex flex-col">
    <Header class="shrink-0 grow-0" />
    <div class="px-4 relative top-[-100rpx] h-[calc(100%-180rpx)]">
      <div class="flex flex-col bg-white h-full rounded-t-[8px]">
        <wd-segmented :options="list" v-model:value="orderType" />

        <template v-if="orderType === '调试单'">
          <div class="overflow-y-auto">
            <OrderList />
          </div>
        </template>

        <template v-if="orderType === '售后单'">
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "../../components/Header/Header.vue"
import OrderList from "../../components/Order/OrderList.vue"
import OrderFilter from "../../components/Order/OrderFilter.vue"
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
