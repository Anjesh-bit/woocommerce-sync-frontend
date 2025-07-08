import { OrderEntity, OrderQueryParams, OrdersApiResponse } from "./order.types";
import axiosInstance from "../../lib/axios/axios";

const triggerSync = async () => {
  try {
    await axiosInstance.post("/sync/orders");
  } catch (error) {
    throw new Error("Failed to trigger sync: " + error);
  }
};

export const OrdersApi = {
  fetchOrders: async (queryParams?: OrderQueryParams): Promise<OrdersApiResponse> => {
    await triggerSync();
    const response = await axiosInstance.get<OrdersApiResponse>("/orders", {
      params: queryParams,
    });
    return response.data;
  },

  fetchOrderById: async (orderId: string): Promise<OrderEntity> => {
    await triggerSync();
    const response = await axiosInstance.get<OrderEntity>(`/orders/${orderId}`);
    return response.data;
  },

  fetchOrdersByProductId: async (productId: string): Promise<OrderEntity[]> => {
    await triggerSync();
    const response = await axiosInstance.get<OrderEntity[]>(`/orders/product/${productId}`);
    return response.data;
  },

  triggerSync,
} as const;
