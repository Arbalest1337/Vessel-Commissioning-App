<template>
  <wd-action-sheet v-model="open" :actions="options" @select="onSelect">
  </wd-action-sheet>
</template>
<script setup>
import { useUserStore } from "../store/user"
const userStore = useUserStore()
const open = defineModel("open")

const options = [{ name: "退出登录" }]

const onSelect = ({ item }) => {
  if (item.name === "退出登录") {
    console.log("logout")
    userStore.logout()
    uni.reLaunch({ url: "/pages/launch/index" })
  }
}
</script>

<style lang="scss" scoped></style>
