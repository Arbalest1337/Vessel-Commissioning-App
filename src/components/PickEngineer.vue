<template>
  <wd-picker
    :columns="filteredOptions"
    use-default-slot
    @confirm="onSelect"
    :z-index="99999"
  >
    <slot />
  </wd-picker>
</template>
<script setup>
import apis from "@/api"
import { Role } from "../enum"
import { storeToRefs } from "pinia"
import { useUserStore } from "../store/user"
import { onMounted } from "vue"
const disabledIds = defineModel("disabledIds", { default: [] })
const userStore = useUserStore()
const { userId, companyId } = storeToRefs(userStore)
const options = ref([])

const loading = ref(false)

onMounted(() => {
  getOptions()
})

const emit = defineEmits(["select"])

const onSelect = ({ value }) => {
  emit("select", value)
}

const filteredOptions = computed(() =>
  options.value.map((item) => ({
    ...item,
    disabled: disabledIds.value.includes(item.id),
  }))
)

const getOptions = async () => {
  try {
    loading.value = true
    const { list } = await apis.companyMember.query({
      page: 1,
      pageSize: 999,
      roles: [Role["工程师"], Role["工程师主管"]],
      companyId: companyId.value,
    })
    options.value = list.map((item) => ({
      ...item,
      label: `${item.user.nickname}  ${item.user.phone}`,
      value: item.id,
    }))
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped></style>
