<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <div class="flex pb-2 items-center">
      <div class="text-[16px]">反馈记录</div>
      <div
      @click="onClick"
        v-if="order.nextEngineerId"
        class="bg-[#006eff] rounded-[4px] text-[12px] py-[2px] px-1 text-white ml-auto"
      >
        查看
      </div>
    </div>
  </div>
</template>
<script setup>
const order = inject("order")


const onClick=()=>{
    
}
</script>

<style lang="scss" scoped></style>
