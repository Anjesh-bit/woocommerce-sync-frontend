import { OrderQueryParams, OrderStatus } from "./order.types";

export const OrdersQueryKeys = {
  all: ["orders"] as const,

  list: (params?: OrderQueryParams) => ["orders", { params }] as const,

  detail: (id: number | string) => ["orders", id] as const,

  byProduct: (productId: number | string) => ["orders-by-product", productId] as const,
};

export const ORDER_STATUSES: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "Pending", color: "gray" },
  processing: { label: "Processing", color: "blue" },
  "on-hold": { label: "On Hold", color: "yellow" },
  completed: { label: "Completed", color: "green" },
  cancelled: { label: "Cancelled", color: "red" },
  refunded: { label: "Refunded", color: "orange" },
  failed: { label: "Failed", color: "red" },
  trash: { label: "Trashed", color: "dark" },
  "checkout-draft": { label: "Checkout Draft", color: "gray" },
};
