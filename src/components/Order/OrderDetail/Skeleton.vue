<template>
  <view class="flex flex-col gap-4">
    <div v-for="item in 5">
      <wd-skeleton animation="flashed" theme="image" />
      <wd-skeleton animation="flashed" theme="paragraph" />
    </div>
  </view>
</template>
<script setup></script>

<style lang="scss" scoped></style>
