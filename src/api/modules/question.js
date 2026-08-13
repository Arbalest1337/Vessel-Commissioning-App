import request from "@/api/request"

export default {
  query: (params) =>
    request({
      method: "GET",
      url: `/order-question/question-by-cursor`,
      params,
    }),
  detail: (id) =>
    request({
      method: "GET",
      url: `/order-question/question/${id}`,
    }),
  create: (data) =>
    request({
      method: "POST",
      url: `/order-question/question`,
      data,
    }),

  close: (data) =>
    request({
      method: "PUT",
      url: `/order-question/question-close`,
      data,
    }),

  requestClose: (data) =>
    request({
      method: "PUT",
      url: `/order-question/question-close-request`,
      data,
    }),
}
