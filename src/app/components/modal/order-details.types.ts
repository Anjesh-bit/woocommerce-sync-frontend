import { OrderEntity } from "../../pages/order/order.types";

export type OrderDetailsModalProps = {
  order: OrderEntity | null;
  opened: boolean;
  onClose: () => void;
};
