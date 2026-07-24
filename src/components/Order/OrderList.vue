<template>
  <OrderFilter v-model:active="active" :total />
  <div class="flex flex-col gap-4">
    <template v-for="item in orders">
      <OrderItem :order="item" />
    </template>
  </div>
</template>
<script setup>
import { OrderStatus } from "../../enum/index.ts"
import OrderFilter from "./OrderFilter.vue"
import OrderItem from "./OrderItem.vue"
import apis from "@/api"
import { onMounted } from "vue"
import { useUserStore } from "../../store/user.js"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const orders = ref([])
const loading = ref(false)
const cursor = computed(() => orders.value.at(-1)?.id)
onMounted(() => {
  getOrders()
})

const total = ref({
  pending: 0,
  inProgress: 0,
  completed: 0,
  all: 0,
})

const statusFilter = {
  ["全部"]: {},
  ["已完成"]: { statuses: [OrderStatus["已完成"]] },
  ["处理中"]: {
    statuses: [OrderStatus["调试准备中"], OrderStatus["调试中"]],
    currentEngineerId: userId.value,
  },
  ["待接收"]: {
    nextEngineerId: userId.value,
  },
}

const params = defineModel("params", { default: {} })

const active = ref("全部")

const getOrders = async () => {
  try {
    loading.value = true
    const { list, ...rest } = await apis.order.query({
      cursor: cursor.value ?? undefined,
      ...params.value,
      ...statusFilter[active.value],
    })
    orders.value = list
    total.value = rest
  } finally {
    loading.value = false
  }
}

watch(active, (v) => {
  orders.value = []
  getOrders()
})
</script>

<style lang="scss" scoped></style>
