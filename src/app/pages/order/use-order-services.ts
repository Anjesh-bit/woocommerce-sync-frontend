import { useQuery } from "@tanstack/react-query";

import { OrdersApi } from "./order.api";
import { OrdersQueryKeys } from "./order.constant";
import { OrderQueryParams, OrdersApiResponse } from "./order.types";

const { fetchOrderById, fetchOrders, fetchOrdersByProductId } = OrdersApi;

export const useOrders = (query?: OrderQueryParams) =>
  useQuery<OrdersApiResponse, Error>({
    queryKey: OrdersQueryKeys.list(query),
    queryFn: () => fetchOrders(query),
    refetchOnWindowFocus: false,
  });

export const useOrder = (id?: string) =>
  useQuery({
    queryKey: OrdersQueryKeys.detail(id || ""),
    queryFn: () => {
      if (!id) throw new Error("Order ID is required");
      return fetchOrderById(id);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

export const useOrdersByProduct = (productId?: string) =>
  useQuery({
    queryKey: OrdersQueryKeys.byProduct(productId || ""),
    queryFn: () => {
      if (!productId) throw new Error("Product ID is required");
      return fetchOrdersByProductId(productId);
    },
    enabled: !!productId,
    refetchOnWindowFocus: false,
  });
