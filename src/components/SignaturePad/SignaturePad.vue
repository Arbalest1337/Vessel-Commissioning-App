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
import { ref, onMounted, getCurrentInstance, nextTick } from "vue"
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

const w = ref(0)
const h = ref(0)

const getSize = async () => {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select(".signature-canvas")
      .boundingClientRect((data) => {
        if (data && data.width && data.height) {
          w.value = data.width
          h.value = data.height
        }
        resolve(data)
      })
      .exec()
  })
}

const init = async () => {
  await nextTick()
  await getSize()
  ctx = uni.createCanvasContext("signatureCanvas", instance)
  ctx.setFillStyle("#ffffff")
  ctx.fillRect(0, 0, w.value, h.value)
  ctx.setLineWidth(props.lineWidth)
  ctx.setLineCap("round")
  ctx.setLineJoin("round")
  ctx.setStrokeStyle(props.color)
  ctx.draw()
}

onMounted(async () => {
  init()
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
  ctx.clearRect(0, 0, w.value, h.value)

  ctx.setFillStyle("#ffffff")
  ctx.fillRect(0, 0, w.value, h.value)

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

  ctx.drawImage(img, 0, 0, w.value, h.value)

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
  init,
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
