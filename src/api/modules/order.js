import request from "@/api/request"

export default {
  query: (params) =>
    request({
      method: "GET",
      url: `/order/by-engineer`,
      params,
    }),
  detail: (id) =>
    request({
      method: "GET",
      url: `/order/${id}`,
    }),
  create: (data) =>
    request({
      method: "POST",
      url: `/order`,
      data,
    }),
  update: (id, data = {}) =>
    request({
      method: "PUT",
      url: `/order/${id}`,
      data,
    }),
  submitForClientConfirmation: (data) =>
    request({
      method: "PUT",
      url: `/order/submit-for-client-confirmation`,
      data,
    }),

  clientConfirmation: (data) =>
    request({
      method: "PUT",
      url: `/order/client-confirmation`,
      data,
    }),
  assignNextEngineer: (data) =>
    request({
      method: "PUT",
      url: `/order/assign-next-engineer`,
      data,
    }),
  nextEngineerConfirm: (data) =>
    request({
      method: "PUT",
      url: `/order/next-engineer-confirm`,
      data,
    }),
  completePreparation: (data) =>
    request({
      method: "PUT",
      url: `/order/complete-preparation`,
      data,
    }),

  completeCommissioning: (data) =>
    request({
      method: "PUT",
      url: `/order/complete-commissioning`,
      data,
    }),

  completeClientAcceptance: (data) =>
    request({
      method: "PUT",
      url: `/order/complete-client-acceptance`,
      data,
    }),
  rejectClientAcceptance: (data) =>
    request({
      method: "PUT",
      url: `/order/reject-client-acceptance`,
      data,
    }),
  updateVehicle: (data) =>
    request({
      method: "PUT",
      url: `/order/update-vehicle`,
      data,
    }),

  updateCheckpointStatus: (data) =>
    request({
      method: "PUT",
      url: `/order/update-checkpoint-status`,
      data,
    }),

  transferEngineer: (data) =>
    request({
      method: "PUT",
      url: `/order/transfer-engineer`,
      data,
    }),

  engineerConfirmTransfer: (data) =>
    request({
      method: "PUT",
      url: `/order/engineer-confirm-transfer`,
      data,
    }),
}
