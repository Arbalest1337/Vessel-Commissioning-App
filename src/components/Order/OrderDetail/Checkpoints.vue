<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="flex gap-3 items-center pb-2">
      <div class="text-[16px]">调试准备确认项</div>
      <div class="ml-auto flex items-center">
        <wd-button type="text" @click="goQuestion">
          问题列表
          <wd-icon name="arrow-right" />
        </wd-button>
      </div>
    </div>

    <wd-tabs slidable="always">
      <block v-for="(item, index) in products" :key="index">
        <wd-tab :title="item.productName">
          <template v-for="(checkpoint, i) in item.orderCheckpoints">
            <Checkpoint :index="i" :checkpoint="checkpoint" />
          </template>
        </wd-tab>
      </block>
    </wd-tabs>
  </div>
</template>
<script setup>
const order = inject("order")
import Checkpoint from "./Checkpoint.vue"
const products = computed(() => order.value.orderProducts ?? [])

const goQuestion = () => {
  uni.navigateTo({
    url: `/pages/order-question/index?orderId=${order.value.id}`,
  })
}
</script>
<style lang="scss" scoped></style>