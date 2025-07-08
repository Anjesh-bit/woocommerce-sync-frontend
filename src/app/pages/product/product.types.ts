export type ProductEntity = {
  id: number;
  name: string;
  sku: string;
  price: number;
  images: { src: string }[];
  orderCount: number;
};

export type ProductQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "name" | "price";
  order?: "asc" | "desc";
};

export type ProductsApiResponse = {
  data: ProductEntity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
