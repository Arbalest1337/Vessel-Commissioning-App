<template>
  <slot>
    <wd-button type="primary" :loading @click="open = true">
      调试完成
    </wd-button>
  </slot>
  <wd-popup
    v-model="open"
    position="bottom"
    :close-on-click-modal="false"
    custom-style="height:75vh;width:100vw;"
  >
    <div class="flex flex-col gap-2 h-full overflow-hidden">
      <div class="flex items-center justify-center">
        <div class="py-1 text-[16px]">调试完成</div>
      </div>
      <div class="shrink-1 grow-1 overflow-y-auto flex flex-col gap-6 p-4">
        <div class="flex gap-4">
          <div>是否培训</div>
          <div class="flex items-center gap-1">
            <div>否</div>
            <wd-switch size="medium" v-model="form.trainingProvided" />
            <div>是</div>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="shrink-0">调试验收单</div>
          <div class="flex-col items-center gap-1">
            <TakePhoto
              size="medium"
              type="primary"
              @uploaded="
                (e) =>
                  (form.acceptanceAttachment = [
                    ...form.acceptanceAttachment,
                    e,
                  ])
              "
            />
            <div class="flex gap-2 flex-wrap">
              <S3Image v-for="item in form.acceptanceAttachment" :src="item" />
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <div>服务确认单</div>
          <div class="flex-col items-center gap-1">
            <TakePhoto
              @uploaded="
                (e) =>
                  (form.confirmationAttachment = [
                    ...form.confirmationAttachment,
                    e,
                  ])
              "
            />
            <div class="flex gap-2 flex-wrap">
              <S3Image
                v-for="item in form.confirmationAttachment"
                :src="item"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <div>工程师签名</div>
          <div class="flex-col items-center gap-1">
            <SignaturePopup
              @uploaded="(e) => (form.engineerCompletionSignature = [e])"
            />
            <div class="flex gap-2 flex-wrap">
              <S3Image
                v-for="item in form.engineerCompletionSignature"
                :src="item"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 flex items-center gap-8 justify-center mt-auto">
        <wd-button @click="open = false" plain>取消</wd-button>
        <wd-button type="primary" @click="onConfirm">确定</wd-button>
      </div>
    </div>
  </wd-popup>
</template>
<script setup>
import apis from "@/api"
import S3Image from "../S3Image.vue"
import { needConfirm, toast } from "../../utils"
import TakePhoto from "../TakePhoto.vue"
import SignaturePopup from "../SignaturePad/SignaturePopup.vue"
const orderId = defineModel("orderId", { default: "" })

const emit = defineEmits(["updated"])
const loading = ref(false)

const form = reactive({
  orderId,
  trainingProvided: true,
  acceptanceAttachment: [],
  confirmationAttachment: [],
  engineerCompletionSignature: [],
})

const open = defineModel("open", { default: false })

watch(open, async (v) => {
  if (!v) {
    await nextTick()
    form.trainingProvided = true
    form.acceptanceAttachment = []
    form.confirmationAttachment = []
    form.engineerCompletionSignature = []
  }
})

const onConfirm = async () => {
  if (
    !form.acceptanceAttachment.length ||
    !form.confirmationAttachment.length ||
    !form.engineerCompletionSignature.length
  ) {
    toast("请上传所有相关文件")
    return
  }

  await needConfirm({
    title: "调试完成",
    content: "是否确认工单调试已完成？",
  })
  try {
    loading.value = true
    await apis.order.completeCommissioning({
      ...form,
    })
    setTimeout(() => {
      toast("工单调试已完成")
    }, 100)
    open.value = false
    emit("updated")
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
