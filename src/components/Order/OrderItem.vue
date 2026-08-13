<template>
  <div class="shadow p-3" @click="goOrderDetail">
    <div class="flex mb-3">
      <div>
        <div class="text-[#747474] font-bold">
          {{ order.no }}
        </div>
        <div class="text-[#999] text-[12px]">
          {{ dayjs(order.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </div>

      <div class="ml-auto shrink-0 grow-0">
        <wd-button
          size="small"
          v-if="order.nextEngineerId === userId"
          type="warning"
          >待接收</wd-button
        >

        <wd-button
          size="small"
          v-if="
            order.currentEngineerId === userId &&
            ![OrderStatus['已完成']].includes(order.status)
          "
          type="primary"
          >{{ OrderStatusMap[order.status] }}</wd-button
        >

        <wd-button
          size="small"
          v-if="
            order.currentEngineerId === userId &&
            [OrderStatus['已完成']].includes(order.status)
          "
          type="success"
          >已完成</wd-button
        >
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div v-for="item in cells" class="flex">
        <div class="grow-0 shrink-0 w-[160rpx] text-gray-400">
          {{ item.label }}
        </div>
        <div>{{ item.value }}</div>
      </div>
    </div>
    <div class="mt-4 mx-8 text-center h-8 text-[#487EFF] leading-8">详情</div>
  </div>
</template>
<script setup>
import { useUserStore } from "../../store/user"
import { dayjs } from "wot-design-uni"
import { OrderStatus, OrderStatusMap } from "../../enum"
import { storeToRefs } from "pinia"
const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const order = defineModel("order", { default: {} })

const goOrderDetail = () => {
  uni.navigateTo({ url: `/pages/order-detail/index?id=${order.value.id}` })
}

const cells = computed(() => [
  {
    label: "工单类型",
    value: "调试单",
  },
   {
    label: "项目号",
    value: order.value.projectNo,
  },
  {
    label: "船号",
    value: order.value.hullNumber,
  },
  {
    label: "调试地点",
    value: order.value.clientAddress,
  },
  {
    label: "调试时间",
    value: dayjs(order.value.estimatedStartAt).format("YYYY-MM-DD"),
  },
  {
    label: "产品",
    value: order.value.productSnapshots
      .map((item) => item.productName)
      .join("，"),
  },
])
</script>

<style lang="scss" scoped></style>
