<template>
  <div class="flex flex-col h-full">
    <Filter class="shrink-0 grow-0" :total v-model:params="params" />
    <div class="flex flex-col gap-4 overflow-y-auto">
      <template v-for="item in orders">
        <OrderItem :order="item" />
      </template>
      <NoData v-if="!loading && !orders.length" />
      <LoadMore :key="params.queryStatus" :loading @load="getOrders" />
    </div>
  </div>
</template>
<script setup>
import LoadMore from "../LoadMorel/LoadMore.vue"
import NoData from "../NoData.vue"
import Filter from "../Filter/Filter.vue"
import { OrderStatus } from "../../enum/index.ts"
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

const params = ref({
  queryStatus: "all",
  pageSize: 10,
})

const total = ref({
  pending: 0,
  inProgress: 0,
  completed: 0,
  all: 0,
})

const getOrders = async () => {
  try {
    loading.value = true
    const { list, ...rest } = await apis.order.query({
      cursor: cursor.value ?? undefined,
      ...params.value,
    })
    orders.value = [...orders.value, ...list]
    total.value = rest
  } finally {
    loading.value = false
  }
}

watch(
  () => params.value.queryStatus,
  () => {
    orders.value = []
  }
)
</script>

<style lang="scss" scoped></style>
