<template>
  <div class="flex w-full max-h-[60px] items-center gap-3 justify-center">
    <CreateComment
      :afterSalesOrder
      v-if="isMeCurrent"
      @updated="emit('updated')"
    />

    <wd-button @click="nextEngineerConfirm" type="primary" v-if="isMeNext">
      确认指派
    </wd-button>

    <PickEngineer
      v-if="
        afterSalesOrder.status === AfterSalesOrderStatus['处理中'] &&
        !afterSalesOrder.nextEngineerId
      "
      :disabledIds="[afterSalesOrder.currentEngineerId]"
      @select="(v) => onTransferEngineer(v)"
    >
      <wd-button type="info" :loading> 转交工单 </wd-button>
    </PickEngineer>

    <wd-button
      @click="engineerComplete"
      type="primary"
      v-if="
        isMeCurrent &&
        !afterSalesOrder.nextEngineerId &&
        afterSalesOrder.status === AfterSalesOrderStatus['处理中']
      "
    >
      处理完成
    </wd-button>
  </div>
</template>
<script setup>
import CreateComment from "./Comment/CreateComment.vue"
import apis from "@/api"
import PickEngineer from "../PickEngineer.vue"
import { toast, needConfirm } from "@/utils"
import { useUserStore } from "@/store/user"
import { AfterSalesOrderStatus } from "../../enum"
const afterSalesOrder = inject("afterSalesOrder")

const userStore = useUserStore()
const emit = defineEmits(["updated"])
const { userId } = storeToRefs(userStore)

const isMeCurrent = computed(
  () => afterSalesOrder.value.currentEngineerId === userId.value
)

const isMeNext = computed(
  () => afterSalesOrder.value.nextEngineerId === userId.value
)

const loading = ref(false)

const nextEngineerConfirm = async () => {
  await needConfirm({
    title: "确收售后指派",
    content: "是否确认接受此售后指派？",
  })
  try {
    loading.value = true
    await apis.afterSales.nextEngineerConfirm({
      afterSalesOrderId: afterSalesOrder.value.id,
    })
    setTimeout(() => {
      toast("售后指派已接受")
    }, 100)
    emit("updated")
  } finally {
    loading.value = false
  }
}

const onTransferEngineer = async (nextEngineerId) => {
  await needConfirm({
    title: "转交工单",
    content: "是否确认将售后转交给其他工程师？",
  })
  try {
    loading.value = true
    await apis.afterSales.transferEngineer({
      afterSalesOrderId: afterSalesOrder.value.id,
      nextEngineerId,
    })
    setTimeout(() => {
      toast("售后单已转交")
    }, 100)
    emit("updated")
  } finally {
    loading.value = false
  }
}

const engineerComplete = async () => {
  await needConfirm({
    title: "处理完成",
    content: "是否确认售后处理已完成？",
  })
  try {
    loading.value = true
    await apis.afterSales.engineerComplete({
      afterSalesOrderId: afterSalesOrder.value.id,
    })
    setTimeout(() => {
      toast("售后处理已完成")
    }, 100)
    emit("updated")
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
