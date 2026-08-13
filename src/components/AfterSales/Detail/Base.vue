<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="text-[16px] pb-2">基础信息</div>
    <div class="flex flex-col gap-3">
      <div v-for="item in cells" class="flex flex-nowrap gap-8">
        <div class="shrink-0 grow-0">{{ item.label }}：</div>
        <div class="ml-auto text-right">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dayjs } from "wot-design-uni"
const afterSalesOrder = inject("afterSalesOrder")
const order = computed(() => afterSalesOrder.value?.order ?? {})
const cells = computed(() => [
  { label: "工单类型", value: "售后单" },
  {
    label: "产品类型",
    value: order.value?.productSnapshots
      ?.map((item) => item.productName)
      .join("，"),
  },
  { label: "客户", value: order.value?.clientSnapshot?.nameZh },
  { label: "船号", value: order.value?.hullNumber },
  { label: "调试地址", value: order.value?.clientAddress },
  {
    label: "客户联系人",
    value:
      order.value?.clientContact?.user?.nickname +
      " " +
      order.value?.clientContact?.user?.phone,
  },
  { label: "服务商", value: order.value?.providerSnapshot?.nameZh },
  {
    label: "服务主管",
    value:
      order.value?.engineerManager?.user?.nickname +
      " " +
      order.value?.engineerManager?.user?.phone,
  },
  { label: "项目号", value: order.value?.projectName },
  {
    label: "预计调试时间",
    value: dayjs(order.value?.estimatedStartAt).format("YYYY-MM-DD"),
  },

  {
    label: "创建时间",
    value: dayjs(order.value?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
  },
])
</script>

<style lang="scss" scoped></style>
