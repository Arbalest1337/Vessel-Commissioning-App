// 通用
import request from "@/api/request"

export default {
  generateUploadUrl: (data) =>
    request({
      method: "POST",
      url: `/storage/generate-upload-url`,
      data,
    }),
}
