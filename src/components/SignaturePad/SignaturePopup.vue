<template>
  <slot :openSignature="() => (open = true)">
    <wd-button @click="open = true" v-bind="$attrs"> 签名 </wd-button>
  </slot>
  <wd-popup
    v-model="open"
    position="bottom"
    :close-on-click-modal="false"
    custom-style="height:100vh;width:100vw;"
  >
    <view class="popup-container">
      <!-- header -->
      <view class="header">
        <text class="title">
          {{ title }}
        </text>

        <wd-icon name="close" size="22px" @click="open = false" />
      </view>

      <!-- 签名组件 -->
      <view class="content">
        <SignaturePad ref="signatureRef" />
      </view>

      <!-- footer -->
      <view class="footer">
        <wd-button plain size="small" @click="clear"> 清空 </wd-button>
        <TakePhoto size="medium" @uploaded="(e) => onUploaded(e)" />
        <wd-button size="medium" type="primary" @click="confirm">
          确认
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<script setup>
import { ref } from "vue"
import { doUpload, uploadFileToUrl } from "../../utils/index.js"
import TakePhoto from "../TakePhoto.vue"

const open = defineModel("open", { default: false })

import SignaturePad from "./SignaturePad.vue"
const props = defineProps({
  title: {
    type: String,
    default: "请签名",
  },
})

const emit = defineEmits(["uploaded"])

const signatureRef = ref()

watch(open, (v) => {
  if (!v) {
    clear()
  } else {
    signatureRef.value?.init()
  }
})

const clear = () => {
  signatureRef.value?.clear()
}

const confirm = async () => {
  const tempPath = await signatureRef.value?.save()
  if (!tempPath) {
    return
  }
  const res = await doUpload(tempPath)
  emit("uploaded", res)
  open.value = false
}

const onUploaded = (path) => {
  emit("uploaded", path)
  open.value = false
}
</script>

<style scoped>
.popup-container {
  height: 100vh;

  width: 100vw;

  display: flex;

  flex-direction: column;

  background: #fff;
}

.header {
  height: 100rpx;

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 0 30rpx;
}

.title {
  font-size: 32rpx;

  font-weight: 600;
}

.content {
  flex: 1;
}

.footer {
  height: 120rpx;

  display: flex;
  gap: 3;

  justify-content: space-around;

  align-items: center;
}
</style>
