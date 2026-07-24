import useUniStorage from "../hooks/useStorage"
import apis from "@/api"

export const useUserStore = defineStore("user", () => {
  const token = useUniStorage("access_token", "")
  const user = useUniStorage("user", {})
  const company = useUniStorage("company", {})

  const login = async ({ usernameOrPhone, password }) => {
    const res = await apis.user.loginByUsernameOrPhone({
      usernameOrPhone,
      password,
    })
    token.value = res.accessToken
  }

  const logout = async () => {
    token.value = ""
    user.value = {}
    company.value = {}
  }

  const loginAs = async ({ companyMemberId }) => {
    const res = await apis.user.loginAs({ companyMemberId })
    token.value = res.accessToken
  }

  const getUserInfo = async () => {
    const res = await apis.user.userInfo()
    const { nickname, email, phone } = res.user
    user.value = {
      ...res,
      nickname,
      email,
      phone,
    }
    company.value = res.company
  }

  const isAdmin = computed(() => user.value.role === Role["管理员"])
  const isSupportManager = computed(() => user.value.role === Role["客服主管"])
  const isSupport = computed(() => user.value.role === Role["客服"])

  const isClientContact = computed(() => user.value.role === Role["客户联系人"])
  const isEngineerManager = computed(
    () => user.value.role === Role["工程师主管"]
  )
  const isEngineer = computed(() => user.value.role === Role["工程师"])
  const companyId = computed(() => company.value.id)
  const userId = computed(() => user.value.id)
  const userRole = computed(() => user.value.role)

  return {
    login,
    loginAs,
    logout,
    getUserInfo,
    token,
    user,
    userRole,
    userId,
    company,
    companyId,
    isAdmin,
    isSupportManager,
    isSupport,
    isClientContact,
    isEngineerManager,
    isEngineer,
  }
})
