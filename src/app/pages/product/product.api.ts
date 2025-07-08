import { ProductQueryParams, ProductsApiResponse } from "./product.types";
import axiosInstance from "../../lib/axios/axios";

const triggerSync = async () => {
  try {
    await axiosInstance.post("/sync/products");
  } catch (error) {
    throw new Error("Failed to trigger sync: " + error);
  }
};

export const ProductsApi = {
  fetchProducts: async (query?: ProductQueryParams): Promise<ProductsApiResponse> => {
    await triggerSync();
    const response = await axiosInstance.get<ProductsApiResponse>("/products", {
      params: query,
    });
    return response.data;
  },
};
