import { useQuery } from "@tanstack/react-query";

import { ProductsApi } from "./product.api";
import { ProductQueryParams, ProductsApiResponse } from "./product.types";

export const useProducts = (query?: ProductQueryParams) =>
  useQuery<ProductsApiResponse>({
    queryKey: ["products", query],
    queryFn: () => ProductsApi.fetchProducts(query),
    refetchOnWindowFocus: false,
  });
