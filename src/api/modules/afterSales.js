import request from "@/api/request"

export default {
  query: (params) =>
    request({
      method: "GET",
      url: `/after-sales/by-engineer`,
      params,
    }),
  detail: (id) =>
    request({
      method: "GET",
      url: `/after-sales/${id}`,
    }),

  createComment: (data) =>
    request({
      method: "POST",
      url: `/after-sales/comment`,
      data,
    }),

  assignNextEngineer: (data) =>
    request({
      method: "PUT",
      url: `/after-sales/assign-next-engineer`,
      data,
    }),
  nextEngineerConfirm: (data) =>
    request({
      method: "PUT",
      url: `/after-sales/next-engineer-confirm`,
      data,
    }),
  transferEngineer: (data) =>
    request({
      method: "PUT",
      url: `/after-sales/transfer-engineer`,
      data,
    }),
  engineerComplete: (data) =>
    request({
      method: "PUT",
      url: `/after-sales/engineer-complete`,
      data,
    }),
}
