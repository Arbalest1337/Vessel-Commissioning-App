<template>
  <view class="timeline">
    <view v-for="(item, index) in list" :key="index" class="timeline-item">
      <!-- 节点 -->
      <view class="timeline-node">
        <view class="dot" :class="{ active: index === 0 }" />
        <view v-if="index !== list.length - 1" class="line" />
      </view>

      <!-- 内容 -->
      <view class="timeline-content">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="time">
          {{ item.time }}
        </view>
        <view class="desc">
          {{ item.description }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.timeline {
  padding: 20rpx;
}

.timeline-item {
  display: flex;
}

.timeline-node {
  width: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dot {
  width: 20rpx;
  height: 20rpx;

  border-radius: 50%;

  background: #ddd;
}

.dot.active {
  background: #1989fa;
}

.line {
  flex: 1;

  width: 2rpx;

  background: #ddd;
}

.timeline-content {
  padding-left: 20rpx;

  padding-bottom: 40rpx;
}

.title {
  font-size: 30rpx;
  font-weight: bold;
}

.time {
  color: #999;

  font-size: 24rpx;
}

.desc {
  margin-top: 10rpx;

  color: #666;
}
</style>
