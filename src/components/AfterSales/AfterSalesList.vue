<template>
  <div class="flex flex-col h-full">
    <Filter class="shrink-0 grow-0" :total v-model:params="params" />
    <div class="flex flex-col gap-4 overflow-y-auto">
      <template v-for="item in afterSales">
        <AfterSalesItem :afterSales="item" />
      </template>
      <NoData v-if="!loading && !afterSales.length" />
      <LoadMore :key="params.queryStatus" :loading @load="getAfterSales" />
    </div>
  </div>
</template>
<script setup>
import NoData from "../NoData.vue"
import LoadMore from "../LoadMorel/LoadMore.vue"
import Filter from "../Filter/Filter.vue"
import { AfterSalesOrderStatus } from "../../enum/index.ts"
import apis from "@/api"
import { onMounted } from "vue"
import { useUserStore } from "../../store/user.js"
import { storeToRefs } from "pinia"
import AfterSalesItem from "./AfterSalesItem.vue"

const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const afterSales = ref([])
const loading = ref(false)
const cursor = computed(() => afterSales.value.at(-1)?.id)

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

const getAfterSales = async () => {
  try {
    loading.value = true
    const { list, ...rest } = await apis.afterSales.query({
      cursor: cursor.value ?? undefined,
      ...params.value,
    })
    afterSales.value = [...afterSales.value, ...list]
    total.value = rest
  } finally {
    loading.value = false
  }
}

watch(
  () => params.value.queryStatus,
  () => {
    afterSales.value = []
  }
)
</script>

<style lang="scss" scoped></style>
