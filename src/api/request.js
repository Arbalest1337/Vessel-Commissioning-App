import config from "@/config"
import { useUserStore } from "@/store/user"
import qs from "qs"

const errorHandle = (code, msg) => {
  if ([401, 403].includes(code)) {
    useUserStore().logout()
    uni.showToast({ title: "登录已失效或用户无权限", icon: "none" })
    setTimeout(() => {
      uni.navigateTo({ url: "/pages/login/index" })
    }, 500)
  } else {
    uni.showToast({ title: msg || "请求失败", icon: "none" })
  }
}

const request = (options) => {
  const userStore = useUserStore()

  if (options.params) {
    const queryString = qs.stringify(options.params, {
      arrayFormat: "repeat", // 效果: statuses=COMPLETED&statuses=PENDING
      allowDots: true,
      skipNulls: true,
    })
    if (queryString) {
      options.url += (options.url.includes("?") ? "&" : "?") + queryString
    }
    options.params = undefined
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseURL + options.url,
      method: options.method || "GET",
      data: options.data ?? options.params ?? {},
      header: {
        ...options.header,
        Authorization: userStore.token ? `Bearer ${userStore.token}` : "",
        "Content-Type": "application/json",
      },
      success: (res) => {
        // 状态码拦截
        const { statusCode } = res
        if (statusCode >= 200 && statusCode < 300) {
          const { data, code, message } = res.data
          if (code !== 200) {
            errorHandle(code, message)
            reject(res)
          }
          resolve(options.inData === false ? res.data : data)
        } else {
          errorHandle(statusCode, res.data?.message)
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({ title: "网络连接超时", icon: "none" })
        reject(err)
      },
    })
  })
}

export default request
