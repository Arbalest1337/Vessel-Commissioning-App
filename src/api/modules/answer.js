import request from "@/api/request"

export default {
  query: (params) =>
    request({
      method: "GET",
      url: `/order-question/answer`,
      params,
    }),
  detail: (id) =>
    request({
      method: "GET",
      url: `/order-question/answer/${id}`,
    }),
  create: (data) =>
    request({
      method: "POST",
      url: `/order-question/answer`,
      data,
    }),
}
