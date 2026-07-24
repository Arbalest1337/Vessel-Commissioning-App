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
