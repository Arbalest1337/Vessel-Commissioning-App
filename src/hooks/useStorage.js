import { useStorage } from "@vueuse/core"

export default function useUniStorage(key, initialValue) {
  return useStorage(key, initialValue, {
    getItem: (key) => {
      const value = uni.getStorageSync(key)
      return value === "" || value === undefined || value === null
        ? null
        : value
    },
    setItem: (key, value) => {
      uni.setStorageSync(key, value)
    },
    removeItem: (key) => {
      uni.removeStorageSync(key)
    },
  })
}
