// 用户
import request from "@/api/request"

export default {
  query: (params) =>
    request({
      method: "GET",
      url: `/company-member`,
      params,
    }),
  detail: (id) =>
    request({
      method: "GET",
      url: `/company-member/${id}`,
    }),
  create: (data) =>
    request({
      method: "POST",
      url: `/company-member`,
      data,
    }),
  update: (id, data) =>
    request({
      method: "PUT",
      url: `/company-member/${id}`,
      data,
    }),
}
