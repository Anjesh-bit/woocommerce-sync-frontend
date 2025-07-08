import { lazy } from "react";

export const Products = lazy(() => import("../../pages/product"));
export const Orders = lazy(() => import("../../pages/order"));
