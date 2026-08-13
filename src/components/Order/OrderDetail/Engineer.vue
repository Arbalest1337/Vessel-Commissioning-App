<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="flex pb-2 items-center">
      <div class="text-[16px]">工程师信息</div>
      <div
        v-if="order.nextEngineerId"
        class="bg-[#006eff] rounded-[4px] text-[12px] py-[2px] px-1 text-white ml-auto"
      >
        指派待确认
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div v-for="item in cells" class="flex flex-nowrap gap-1 items-center">
        <div class="shrink-0 grow-0">{{ item.label }}：</div>
        <div class="ml-auto text-right pl-8">{{ item.value }}</div>
        <template
          v-if="
            item.label === '车牌号' &&
            [OrderStatus['调试准备中'], OrderStatus['调试中']].includes(
              order.status
            )
          "
        >
          <UpdateVehicle />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { OrderStatus } from "../../../enum/index.ts"
import UpdateVehicle from "../UpdateVehicle.vue"
const order = inject("order")

const currentEngineer = computed(() => order.value.currentEngineer)
const nextEngineer = computed(() => order.value.nextEngineer)

const cells = computed(() => {
  const list = [
    {
      label: "当前工程师",
      value:
        currentEngineer.value?.user?.nickname +
        " " +
        currentEngineer.value?.user?.phone,
    },
    {
      label: "车牌号",
      value: order.value.vehicle,
    },
  ]

  if (order.value.nextEngineerId) {
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
