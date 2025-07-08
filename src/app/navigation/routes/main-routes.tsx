import { MainRoutes } from "./route.types";
import Orders from "../../pages/order";
import Product from "../../pages/product";

export const mainRoutes: MainRoutes[] = [
  {
    path: "/orders",
    render: () => <Orders />,
  },
  {
    path: "/products",
    render: () => <Product />,
  },
];
