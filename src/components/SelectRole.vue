<template>
  <wd-action-sheet v-model="open" :actions="processed" @select="onSelect" />
</template>
<script setup>
import { useUserStore } from "../store/user"
import { Role, RoleMap } from "../enum"
import apis from "@/api"

const open = defineModel("open")

watch(open, (v) => {
  if (v) {
    getRoles()
  } else {
    roles.value = []
  }
})

const loading = reactive({
  spin: false,
  submit: true,
})
const roles = ref([])

const processed = computed(() =>
  roles.value.map((item) => ({
    ...item,
    name: `${item.company.nameZh}  ${RoleMap[item.role]}`,
    disabled: item.role !== Role["工程师"],
  }))
)

const getRoles = async () => {
  try {
    loading.spin = true
    const res = await apis.user.myCompanyMembers()
    roles.value = res
  } finally {
    loading.spin = false
  }
}

const onSelect = async ({ item }) => {
  try {
    uni.showLoading()
    await useUserStore().loginAs({
      companyMemberId: item.id,
    })
    open.value = false
    uni.navigateTo({
      url: "/pages/index/index",
    })
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped></style>
