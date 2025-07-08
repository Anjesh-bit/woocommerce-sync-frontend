export type OrderStatus =
  | "pending"
  | "processing"
  | "cancelled"
  | "refunded"
  | "on-hold"
  | "completed"
  | "failed"
  | "checkout-draft"
  | "trash";

export type BillingShippingInfo = {
  first_name: string;
  last_name: string;
  email?: string;
};

export type LineItem = {
  id: number;
  name: string;
  quantity: number;
  total: string | number;
  image: { src: string };
};

export type OrderEntity = {
  id: number;
  number: string;
  order_key: string;
  status: OrderStatus;
  date_created: string;
  total: number;
  customer_id: number;
  customer_note?: string;
  billing: BillingShippingInfo;
  shipping: BillingShippingInfo;
  line_items: LineItem[];
};

export type OrderQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
  order?: "asc" | "desc";
  product_id: string | null;
};

export type OrdersApiResponse = {
  data: OrderEntity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
