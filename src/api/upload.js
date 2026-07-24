import config from "@/config"
import { useUserStore } from "@/store/user"

const errorHandle = () => {
  uni.showToast({ title: "上传失败", icon: "none" })
}

export const uploadFile = (filePath) => {
  const userStore = useUserStore()
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: config.baseURL + `/common/upload`,
      filePath: filePath,
      name: "file",
      formData: {},
      header: {
        Authorization: userStore.token ? `Bearer ${userStore.token}` : "",
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const { code, url, fileName } = JSON.parse(res.data)
          if (code !== 200) {
            errorHandle()
            reject("上传失败")
          }
          //   resolve({ url })
          resolve({ url: config.baseURL + url })
        } else {
          errorHandle()
          reject("上传失败")
        }
      },
      fail: (err) => {
        errorHandle()
        reject("上传失败")
      },
      complete: () => {},
    })
  })
}

export const takePhoto = () => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["camera", "album"],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        resolve(tempFilePath)
      },
      fail: (err) => {
        console.log("选择图片失败：", err)
        reject("选择图片失败")
      },
    })
  })
}
