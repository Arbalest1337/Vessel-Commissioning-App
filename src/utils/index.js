import apis from "@/api"
import config from "@/config"
export const scanQRCode = () => {
  return new Promise((resolve, reject) => {
    uni.scanCode({
      onlyFromCamera: true,
      scanType: ["qrCode"],
      success: (res) => {
        console.log("二维码结果 ")
        console.log(res)
        resolve(res.result)
      },
      fail: (err) => {
        console.log("扫码失败")
        reject(err)
      },
    })
  })
}

export const toast = (title) => {
  uni.showToast({
    icon: "none",
    title,
  })
}

export const sleep = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

export const needConfirm = ({ title, content }) => {
  return new Promise(async (resolve, reject) => {
    const res = await uni.showModal({
      title,
      content,
    })
    if (res.confirm) {
      resolve()
    }
    reject()
  })
}

export const doUpload = async (tempPath, fileName = "upload_image") => {
  if (!tempPath) return
  const { objectName, uploadUrl } = await generateUploadUrl(fileName)
  await uploadFileToUrl(tempPath, uploadUrl)
  return objectName
}

export const generateUploadUrl = async (fileName) => {
  const { objectName, uploadUrl } = await apis.common.generateUploadUrl({
    fileName,
  })
  return { objectName, uploadUrl }
}

export const S3Url = (url) =>
  `${config.S3_ENDPOINT}/${config.S3_BUCKET_NAME}/${url}`

export const maskIdCard = (idCard) => {
  if (!/^\d{17}[\dXx]$/.test(idCard)) {
    return idCard
  }
  return idCard.replace(/^(.{6}).{8}(.{4})$/, "$1********$2")
}

export const uploadFileToUrl = async (
  filePath,
  url,
  contentType = "image/png"
) => {
  try {
    // 1. 函数内部自动根据平台将临时路径转为二进制数据 (ArrayBuffer)
    let fileData
    if (uni.getFileSystemManager) {
      // App / 小程序端：通过文件系统管理器读取
      fileData = await new Promise((resolve, reject) => {
        uni.getFileSystemManager().readFile({
          filePath: filePath,
          success: (res) => resolve(res.data), // res.data 为 ArrayBuffer
          fail: (err) => reject(err),
        })
      })
    } else {
      // H5 端：直接 fetch 读取 blob 路径
      const res = await fetch(filePath)
      fileData = await res.arrayBuffer()
    }

    // 2. 发送 PUT 请求
    return new Promise((resolve, reject) => {
      uni.request({
        url,
        method: "PUT",
        header: {
          "Content-Type": contentType,
        },
        data: fileData,
        success: (res) => {
          // S3 / OSS 上传成功通常返回 200 或 204
          if (res.statusCode === 200 || res.statusCode === 204) {
            console.log("上传成功！")
            uni.showToast({ title: "上传成功", icon: "success" })
            resolve(res)
          } else {
            uni.showToast({ title: "上传失败", icon: "none" })
            reject(res)
          }
        },
        fail: (err) => {
          uni.showToast({ title: "网络请求失败", icon: "none" })
          reject(err)
        },
      })
    })
  } catch (error) {
    console.error("读取或上传文件失败:", error)
    uni.showToast({ title: "文件处理失败", icon: "none" })
    throw error
  }
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