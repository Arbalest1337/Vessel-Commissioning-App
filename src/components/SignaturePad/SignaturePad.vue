<template>
  <view class="signature-wrapper">
    <canvas
      class="signature-canvas"
      canvas-id="signatureCanvas"
      :disable-scroll="true"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    />
  </view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import { toast } from "../../utils"

const props = defineProps({
  width: {
    type: Number,
    default: 700,
  },

  height: {
    type: Number,
    default: 400,
  },

  lineWidth: {
    type: Number,
    default: 4,
  },

  color: {
    type: String,
    default: "#000000",
  },
})

const emit = defineEmits(["save"])

const instance = getCurrentInstance()

let ctx = null

const drawing = ref(false)

const lastPoint = ref(null)

// 保存历史
const history = ref([])

onMounted(() => {
  ctx = uni.createCanvasContext("signatureCanvas", instance)

  ctx.setFillStyle("#ffffff")
  ctx.fillRect(0, 0, props.width, props.height)

  ctx.setLineWidth(props.lineWidth)

  ctx.setLineCap("round")

  ctx.setLineJoin("round")

  ctx.setStrokeStyle(props.color)

  ctx.draw()
})

function getPoint(e) {
  const touch = e.touches[0]

  return {
    x: touch.x,
    y: touch.y,
  }
}

function touchStart(e) {
  drawing.value = true

  const point = getPoint(e)

  lastPoint.value = point

  saveHistory()
}

function touchMove(e) {
  if (!drawing.value) return

  const point = getPoint(e)

  ctx.beginPath()

  ctx.moveTo(lastPoint.value.x, lastPoint.value.y)

  ctx.lineTo(point.x, point.y)

  ctx.stroke()

  ctx.draw(true)

  lastPoint.value = point
}

function touchEnd() {
  drawing.value = false
}

/**
 * 保存当前状态
 */
function saveHistory() {
  uni.canvasToTempFilePath(
    {
      canvasId: "signatureCanvas",

      fileType: "png",

      success(res) {
        history.value.push(res.tempFilePath)
      },
    },
    instance
  )
}

function clear() {
  ctx.clearRect(0, 0, props.width, props.height)

  ctx.setFillStyle("#ffffff")
  ctx.fillRect(0, 0, props.width, props.height)

  ctx.draw()

  history.value = []
  lastPoint.value = null
}

function undo() {
  if (history.value.length <= 1) {
    clear()
    return
  }

  history.value.pop()

  const img = history.value[history.value.length - 1]

  ctx.drawImage(img, 0, 0, props.width, props.height)

  ctx.draw()
}

function save() {
  if (!lastPoint.value) {
    toast("需要签名")
    return
  }
  return new Promise((resolve) => {
    uni.canvasToTempFilePath(
      {
        canvasId: "signatureCanvas",

        fileType: "png",

        success(res) {
          resolve(res.tempFilePath)
        },
      },
      instance
    )
  })
}

defineExpose({
  clear,
  save,
  undo,
})
</script>

<style scoped>
.signature-wrapper {
  width: 100%;
}

.signature-canvas {
  width: 100%;

  height: calc(100vh - 240rpx);

  background: #fff;

  border: 1px solid #ddd;
}
</style>
