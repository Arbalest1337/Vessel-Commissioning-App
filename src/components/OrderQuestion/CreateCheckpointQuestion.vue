<template>
  <slot :doOpen="() => (open = true)">
    <wd-button plain size="small" @click="open = true">反馈</wd-button>
  </slot>

  <wd-popup
    v-model="open"
    position="bottom"
    :close-on-click-modal="false"
    custom-style="height:50vh;width:100vw;"
  >
    <div class="flex flex-col gap-2 h-full overflow-hidden">
      <div class="flex items-center justify-center">
        <div class="py-1 text-[16px]">问题反馈</div>
      </div>

      <div class="shrink-1 grow-1 overflow-y-auto flex flex-col gap-6 p-4">
        <div class="flex gap-4">
          <div class="shrink-0 w-[80px]">问题检查点</div>
          <div class="flex gap-2 flex-col">
            <div>{{ checkpoint.descriptionEn }}</div>
            <div>{{ checkpoint.description }}</div>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="shrink-0 w-[80px]">问题内容</div>
          <wd-textarea
            auto-height
            class="w-full grow-1 shrink-1 !p-0"
            v-model="form.content"
            placeholder="填写问题内容"
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
import { nextTick } from "vue"
import { toast } from "@/utils"

const open = defineModel("open", { default: false })

const emit = defineEmits(["updated"])
const checkpoint = defineModel("checkpoint", { default: {} })
const loading = ref(false)

const form = reactive({
  orderCheckpointId: checkpoint.value.id,
  orderId: checkpoint.value.orderId,
  content: "",
})

watch(open, async (v) => {
  if (!v) {
    await nextTick()
    form.content = ""
  }
})

const onConfirm = async () => {
  if (!form.content) {
    toast("请输入问题内容")
    return
  }
  try {
    loading.value = true
    await apis.question.create({
      ...form,
    })
    setTimeout(() => {
      toast("问题已提交")
    }, 100)
    emit("updated")
    open.value = false
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
