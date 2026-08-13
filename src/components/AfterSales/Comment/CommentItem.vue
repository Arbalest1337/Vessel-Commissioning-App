<template>
  <div class="bg-white rounded-[4px] shadow px-3 py-3 obx-border">
    <slot />

    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <div class="shrink-0 grow-0">
          {{ comment?.createdByMember?.user?.nickname }}
        </div>
        <div class="text-right w-full grow-1 shrink-1 break-all">
          {{ dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
      </div>

      <div class="flex gap-3">
        <div class="shrink-0 grow-0">描述:</div>
        <div class="text-right w-full grow-1 shrink-1 break-all">
          {{ comment.content }}
        </div>
      </div>

      <div class="flex gap-3" v-if="comment.files.length">
        <div class="shrink-0 grow-0">图片：</div>
        <div
          class="flex w-full grow-1 shrink-1 flex-wrap items-center gap-3 justify-end"
        >
          <S3Image
            :width="48"
            :height="48"
            v-for="item in comment.files"
            :src="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dayjs } from "wot-design-uni"
import S3Image from "../../S3Image.vue"
const comment = defineModel("comment", { default: {} })
</script>

<style lang="scss" scoped></style>
