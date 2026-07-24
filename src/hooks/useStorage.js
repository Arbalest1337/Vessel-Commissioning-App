import { useStorage } from "@vueuse/core"

export default function useUniStorage(key, initialValue) {
  return useStorage(key, initialValue, {
    getItem: (key) => {
      return uni.getStorageSync(key)
    },
    setItem: (key, value) => {
      uni.setStorageSync(key, value)
    },
    removeItem: (key) => {
      uni.removeStorageSync(key)
    },
  })
}
