export const enumToMap = (enumObj: Record<string, string>) =>
  Object.entries(enumObj).reduce(
    (obj, [k, v]) => {
      obj[k] = v
      obj[v] = k
      return obj
    },
    {} as Record<string, string>
  )

export const enumToOptions = (enumObj: Record<string, string>) =>
  Object.entries(enumObj).map(([label, value]) => ({
    label,
    value,
  }))

export enum Role {
  "管理员" = "ADMIN",
  "业务管理员" = "BUSINESS_ADMIN",
  "客服主管" = "SUPPORT_MANAGER",
  "客服" = "SUPPORT",
  "客户联系人" = "CLIENT_CONTACT",
  "工程师主管" = "PROVIDER_ENGINEER_MANAGER",
  "工程师" = "PROVIDER_ENGINEER",
}

export const RoleMap = enumToMap(Role)
export const RoleOptions = enumToOptions(Role)

export enum OrderStatus {
  "草稿" = "DRAFT",
  "待客户确认" = `PENDING_CLIENT_CONFIRMATION`,
  "待分配工程师" = `PENDING_ASSIGNMENT`,
  "待工程师确认" = "PENDING_ENGINEER_CONFIRMATION",
  "调试准备中" = "PREPARING",
  "调试中" = "IN_PROGRESS",
  "待客户验收" = "PENDING_CLIENT_ACCEPTANCE",
  "已完成" = "COMPLETED",
  "已取消" = "CANCELED",
}

export const OrderStatusOptions = enumToOptions(OrderStatus)
export const OrderStatusMap = enumToMap(OrderStatus)

export enum CheckpointStatus {
  "已完成" = "COMPLETED",
  "未完成" = "NOT_COMPLETED",
  "不认可" = "NOT_APPLICABLE",
}
export const CheckpointStatusOptions = enumToOptions(CheckpointStatus)
export const CheckpointStatusMap = enumToMap(CheckpointStatus)

export enum QuestionStatus {
  "反馈中" = "OPEN",
  "待关闭" = "PENDING_CLOSURE",
  "已关闭" = "CLOSED",
}
export const QuestionStatusMap = enumToMap(QuestionStatus)

export enum AfterSalesOrderStatus {
  "待分配工程师" = `PENDING_ASSIGNMENT`,
  "待工程师确认" = "PENDING_ENGINEER_CONFIRMATION",
  "处理中" = "IN_PROGRESS",
  "待验收" = "PENDING_CLIENT_ACCEPTANCE",
  "已完成" = "COMPLETED",
  "已取消" = "CANCELED",
}
export const AfterSalesOrderStatusMap = enumToMap(AfterSalesOrderStatus)

export enum OrderEventType {
  "创建工单" = "CREATED",
  "提交给客户确认" = "SUBMITTED_TO_CLIENT",
  "客户确认" = "CLIENT_CONFIRMED",
  "指派工程师" = "ENGINEER_ASSIGNED",
  "接受指派" = "ENGINEER_ASSIGNED_CONFIRMED",
  "工单转交" = "ENGINEER_TRANSFER_REQUESTED",
  "接受转交" = "ENGINEER_TRANSFER_CONFIRMED",
  "更新车牌" = "VEHICLE_UPDATED",
  "调试准备完成" = "PREPARATION_COMPLETED",
  "调试完成" = "COMMISSIONING_COMPLETED",
  "验收通过" = "CLIENT_ACCEPTED",
  "验收退回" = "CLIENT_REJECTED",
  "申请售后" = "AFTER_SALES_CREATED",
}
export const OrderEventTypeMap = enumToMap(OrderEventType)

export enum AfterSalesOrderEventType {
  "创建售后单" = "CREATED",
  "指派工程师" = "ENGINEER_ASSIGNED",
  "接受指派" = "ENGINEER_ASSIGNED_CONFIRMED",
  "售后单转交给" = "ENGINEER_TRANSFER_REQUESTED",
  "接受转交" = "ENGINEER_TRANSFER_CONFIRMED",
  "售后处理完成" = "AFTER_SALES_COMPLETED",
  "售后验收完成" = "CLIENT_ACCEPTED",
  "售后验收退回" = "CLIENT_REJECTED",
}
export const AfterSalesOrderEventTypeMap = enumToMap(AfterSalesOrderEventType)
