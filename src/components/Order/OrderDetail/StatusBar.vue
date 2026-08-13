<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border !z-1">
    <div class="text-[16px]">调试 {{ order.no }}</div>
    <div class="text-[12px] text-[#747474] pb-4">
      发起人：{{ order?.createdByMember?.user?.nickname }}
      {{ order?.createdByMember?.user?.phone }}
    </div>

    <wd-steps :active align-center class="mb-2">
      <wd-step v-for="item in list" :title="item.title" />
    </wd-steps>
  </div>
</template>
<script setup>
import { OrderStatus } from "../../../enum"

const order = inject("order")
const status = computed(() => order.value.status)
const list = [
  { title: "待接收", status: OrderStatus["待工程师确认"] },
  { title: "调试准备", status: OrderStatus["调试准备中"] },
  { title: "调试", status: OrderStatus["调试中"] },
  {
    title: "已完成",
    status: [OrderStatus["待客户验收"], OrderStatus["已完成"]],
  },
]
const active = computed(() =>
  list.findIndex((item) => item.status.includes(status.value))
)
</script>

<style lang="scss" scoped></style>
