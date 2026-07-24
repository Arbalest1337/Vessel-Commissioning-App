// 用户
import request from "@/api/request"

export default {
  loginByUsername: (data) =>
    request({
      method: "POST",
      url: `/auth/sign-in-by-username`,
      data,
    }),
  loginByPhone: (data) =>
    request({
      method: "POST",
      url: `/auth/sign-in-by-phone`,
      data,
    }),
  loginByUsernameOrPhone: (data) =>
    request({
      method: "POST",
      url: `/auth/sign-in-by-username-or-phone`,
      data,
    }),

  myCompanyMembers: (params) =>
    request({
      method: "GET",
      url: `/company-member/me`,
      params,
    }),

  loginAs: (data) =>
    request({
      method: "POST",
      url: `/auth/sign-in-as`,
      data,
    }),

  userInfo: (params) =>
    request({
      method: "GET",
      url: `/company-member/current`,
      params,
    }),
}
