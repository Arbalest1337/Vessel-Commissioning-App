<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border !z-1">
    <div class="text-[16px]">售后 {{ afterSalesOrder.no }}</div>
    <div class="text-[12px] text-[#747474] pb-4">
      发起人：{{ afterSalesOrder?.createdByMember?.user?.nickname }}
      {{ afterSalesOrder?.createdByMember?.user?.phone }}
    </div>

    <wd-steps :active align-center class="mb-2">
      <wd-step v-for="item in list" :title="item.title" />
    </wd-steps>
  </div>
</template>
<script setup>
import { AfterSalesOrderStatus } from "../../../enum"

const afterSalesOrder = inject("afterSalesOrder")

const status = computed(() => afterSalesOrder.value.status)
const list = [
  { title: "待接收", status: [AfterSalesOrderStatus["待工程师确认"]] },
  { title: "处理中", status: [AfterSalesOrderStatus["处理中"]] },
  {
    title: "已完成",
    status: [AfterSalesOrderStatus["待验收"], AfterSalesOrderStatus["已完成"]],
  },
]

const active = computed(() =>
  list.findIndex((item) => item.status.includes(status.value))
)
</script>

<style lang="scss" scoped></style>
