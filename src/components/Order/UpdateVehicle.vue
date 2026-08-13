<template>
  <slot>
    <wd-button type="primary" size="small" :loading @click="open = true">
      更新车牌
    </wd-button>
  </slot>
  <wd-popup
    v-model="open"
    position="bottom"
    :close-on-click-modal="false"
    custom-style="height:50vh;width:100vw;"
  >
    <div class="flex flex-col gap-2 h-full overflow-hidden">
      <div class="flex items-center justify-center">
        <div class="py-1 text-[16px]">更新车牌</div>
      </div>
      <div class="shrink-1 grow-1 overflow-y-auto flex flex-col gap-6 p-4">
        <div class="flex gap-4 items-center">
          <div>车牌号</div>
          <wd-input
            type="text"
            v-model="form.vehicle"
            placeholder="请输入车牌号"
            size="large"
          />
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

const order = inject("order")

const emit = defineEmits(["updated"])
const loading = ref(false)

const form = reactive({
  orderId: computed(() => order.value.id),
  vehicle: "",
})

const open = defineModel("open", { default: false })

watch(open, (v) => {
  if (!v) {
    form.vehicle = ""
  }
})

const onConfirm = async () => {
  if (!form.vehicle.trim()) {
    toast("请输入车牌号")
    return
  }
  try {
    loading.value = true
    await apis.order.updateVehicle({ ...form })
    setTimeout(() => {
      toast("车牌更新成功")
    }, 100)
    emit("updated")
    order.value.vehicle = form.vehicle
    open.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
