<template>
  <div class="flex gap-2 flex-nowrap">
    <div
      class="px-2 rounded-[4px] h-6 bg-[rgba(227,242,224,1)] color-[#6DAB5A] grow-0 shrink-0"
    >
      {{ index + 1 }}
    </div>
    <div class="grow-1 shrink-1 w-full">
      <div>{{ checkpoint.descriptionEn }}</div>
      <div>{{ checkpoint.description }}</div>

      <div class="flex items-center">
        <div class="ml-auto">
          <wd-select-picker
            type="radio"
            v-model="checkpoint.status"
            :columns="CheckpointStatusOptions"
            @confirm="onChangeCheckpointStatus"
          />
        </div>

        <CreateCheckpointQuestion :checkpoint />
      </div>
    </div>
  </div>
</template>
<script setup>
import apis from "@/api"
import CreateCheckpointQuestion from "@/components/OrderQuestion/CreateCheckpointQuestion.vue"
import { CheckpointStatusMap, CheckpointStatusOptions } from "../../../enum"
const index = defineModel("index", { default: 0 })
const checkpoint = defineModel("checkpoint", { default: {} })

const loading = ref(false)
const onChangeCheckpointStatus = async ({ value }) => {
  try {
    loading.value = true
    uni.showLoading()
    await apis.order.updateCheckpointStatus({
      checkpointId: checkpoint.value.id,
      orderId: checkpoint.value.orderId,
      status: value,
    })
  } finally {
    loading.value = false
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped></style>
