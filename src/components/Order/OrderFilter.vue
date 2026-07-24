<template>
  <div class="flex flex-nowrap justify-around gap-2 w-full box-border px-3">
    <div
      @click="active = item.label"
      v-for="item in items"
      class="text-center py-3"
      :class="`${active === item.label ? 'text-[blue] font-bold' : ''}`"
    >
      <div>{{ item.value }}</div>
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>
<script setup>
const active = defineModel("active", { default: "全部" })
const total = defineModel("total", {
  default: {
    pending: 0,
    inProgress: 0,
    completed: 0,
    all: 0,
  },
})

const items = computed(() => [
  {
    label: "待接收",
    value: total.value.pending,
  },
  {
    label: "处理中",
    value: total.value.inProgress,
  },
  {
    label: "已完成",
    value: total.value.completed,
  },
  {
    label: "全部",
    value: total.value.all,
  },
])
</script>

<style lang="scss" scoped></style>
