<template>
  <div class="flex max-h-[60px] gap-3 items-center justify-center">
    <wd-button
      :loading
      type="primary"
      v-if="isMeNext && order.status === OrderStatus['待工程师确认']"
      @click="nextEngineerConfirm"
    >
      确认指派
    </wd-button>

    <template
      v-if="
        !order.nextEngineerId &&
        isMeCurrent &&
        ![OrderStatus['待客户验收'], OrderStatus['已完成']].includes(
          order.status
        )
      "
    >
      <PickEngineer
        :disabledIds="[order.currentEngineerId]"
        @select="(v) => onTransferEngineer(v)"
      >
        <wd-button type="info" :loading> 转交工单 </wd-button>
      </PickEngineer>
    </template>

    <wd-button
      @click="engineerConfirmTransfer"
      type="primary"
      v-if="isMeNext && order.currentEngineerId"
    >
      确认转交
    </wd-button>

    <SignaturePopup
      @uploaded="(e) => engineerCompletePreparation(e)"
      v-if="
        order.status === OrderStatus['调试准备中'] &&
        isMeCurrent &&
        !order.nextEngineerId
      "
    >
      <template #default="{ openSignature }">
        <wd-button type="primary" :loading @click="openSignature">
          调试准备完成
        </wd-button>
      </template>
    </SignaturePopup>

    <!-- 调试完成 -->
    <CompletePopup
      :orderId="order.id"
      @updated="emit('updated')"
      v-if="
        order.status === OrderStatus['调试中'] &&
        isMeCurrent &&
        !order.nextEngineerId
      "
    />
  </div>
</template>
<script setup>
import apis from "@/api"
import PickEngineer from "../PickEngineer.vue"
import { needConfirm, toast } from "../../utils"
import { storeToRefs } from "pinia"
import { useUserStore } from "../../store/user"
import { OrderStatus } from "../../enum"
import SignaturePopup from "../SignaturePad/SignaturePopup.vue"
import CompletePopup from "./CompletePopup.vue"

const userStore = useUserStore()
const emit = defineEmits(["updated"])
const { userId } = storeToRefs(userStore)
const order = defineModel("order", { default: {} })

const isMeCurrent = computed(
  () => order.value.currentEngineerId === userId.value
)

const isMeNext = computed(() => order.value.nextEngineerId === userId.value)

const loading = ref(false)

// 工程师确认指派
const nextEngineerConfirm = async () => {
  await needConfirm({
    title: "确认指派",
    content: "是否确认此工单的指派？",
  })
  try {
    loading.value = true
    await apis.order.nextEngineerConfirm({
      id: order.value.id,
    })
    emit("updated")
  } finally {
    loading.value = false
  }
}

// 工程师确认转移
const engineerConfirmTransfer = async () => {
  await needConfirm({
    title: "确认转交",
    content: "是否确认此工单的转交指派？",
  })
  try {
    loading.value = true
    await apis.order.engineerConfirmTransfer({ orderId: order.value.id })
    emit("updated")
  } finally {
    loading.value = false
  }
}

const onTransferEngineer = async (nextEngineerId) => {
  await needConfirm({
    title: "确认转交",
    content: "是否确认将此工单转交给其他工程师处理？",
  })
  try {
    loading.value = true
    await apis.order.transferEngineer({
      orderId: order.value.id,
      nextEngineerId,
    })
    emit("updated")
    setTimeout(() => {
      toast("已提交转交")
    }, 100)
  } finally {
    loading.value = false
  }
}

// 准备完成
const engineerCompletePreparation = async (signature) => {
  await needConfirm({
    title: "调试准备完成",
    content: "是否确认工单调试准备完成？",
  })
  try {
    loading.value = true
    await apis.order.completePreparation({
      orderId: order.value.id,
      engineerReadinessSignature: [signature],
    })
    emit("updated")
    setTimeout(() => {
      toast("调试准备已完成")
    }, 100)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
