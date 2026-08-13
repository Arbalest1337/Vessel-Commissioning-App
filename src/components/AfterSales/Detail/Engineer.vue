<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="flex pb-2 items-center">
      <div class="text-[16px]">工程师信息</div>
      <div
        v-if="afterSalesOrder.nextEngineerId"
        class="bg-[#006eff] rounded-[4px] text-[12px] py-[2px] px-1 text-white ml-auto"
      >
        指派待确认
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div v-for="item in cells" class="flex flex-nowrap gap-1 items-center">
        <div class="shrink-0 grow-0">{{ item.label }}：</div>
        <div class="ml-auto text-right pl-8">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { AfterSalesOrderStatus, OrderStatus } from "../../../enum/index.ts"
const afterSalesOrder = inject("afterSalesOrder")

const currentEngineer = computed(() => afterSalesOrder.value.currentEngineer)
const nextEngineer = computed(() => afterSalesOrder.value.nextEngineer)

const cells = computed(() => {
  const list = []

  if (afterSalesOrder.value.currentEngineerId) {
    list.push({
      label: "当前工程师",
      value:
        currentEngineer.value?.user?.nickname +
        " " +
        currentEngineer.value?.user?.phone,
    })
  }

  if (afterSalesOrder.value.nextEngineerId) {
    list.push({
      label: "指派中工程师",
      value:
        nextEngineer.value?.user?.nickname +
        " " +
        nextEngineer.value?.user?.phone,
    })
  }

  return list
})
</script>

<style lang="scss" scoped></style>
