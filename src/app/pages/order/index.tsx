import { TextInput, Select, Group, Stack, Title, ThemeIcon, Box } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ORDER_STATUSES } from "./order.constant";
import styles from "./order.module.css";
import { OrderEntity, OrderStatus } from "./order.types";
import { useOrders } from "./use-order-services";
import { PackageSvg, SearchSvg } from "../../../assets/static/icons";
import { OrderDetailModal } from "../../components/modal/order-details.modal";
import { OrderTable } from "../../components/table/order.table";
import { Toast } from "../../components/toast";
import { useToastManager } from "../../hooks/use-toast";

export default function Orders() {
  const [search, setSearch] = useState("");
  const { showError, toastProps } = useToastManager();
  const [searchParams] = useSearchParams();
  const idx = searchParams.get("productId");

  const [debouncedSearch] = useDebouncedValue(search, 400);

  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [sort, setSort] = useState<"date_created" | "total">("date_created");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderEntity | null>(null);

  const { data, isLoading, isError, error } = useOrders({
    search: debouncedSearch,
    status: status || "",
    sort,
    order,
    page,
    limit: 20,
    product_id: idx,
  });

  const handleSort = (column: "date_created" | "total") => {
    if (sort === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(column);
      setOrder("desc");
    }
  };

  const handleRowClick = (order: OrderEntity) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const orderStatusMap = Object.entries(ORDER_STATUSES).map(([value, { label }]) => ({
    value,
    label,
  }));

  useEffect(() => {
    if (isError && error) {
      showError(error, "Failed to load orders");
    }
  }, [isError, error, showError]);

  return (
    <Fragment>
      <Toast {...toastProps} />
      <Stack p="md">
        <Box className={styles["order-title"]}>
          <Title order={2}>Orders</Title>
          <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: "#FFD700", to: "#FFA500", deg: 45 }}>
            <PackageSvg />
          </ThemeIcon>
        </Box>

        <Group grow>
          <TextInput
            placeholder="Search by ID, customer, product..."
            leftSection={<SearchSvg />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            styles={{
              input: {
                border: "2px solid rgb(255, 165, 0)",
              },
            }}
          />
          <Select
            data={[{ value: "", label: "All Statuses" }, ...orderStatusMap]}
            styles={{
              input: {
                border: "2px solid rgb(255, 165, 0)",
              },
            }}
            placeholder="Filter by status"
            clearable
            value={status}
            onChange={(value) => setStatus(value as OrderStatus)}
          />
        </Group>

        <OrderTable
          data={data?.data || []}
          isLoading={isLoading}
          page={page}
          total={data?.pagination.total || 0}
          onPageChange={setPage}
          onSortChange={handleSort}
          sortKey={sort}
          sortOrder={order}
          onRowClick={handleRowClick}
        />

        <OrderDetailModal order={selectedOrder} opened={!!selectedOrder} onClose={handleCloseModal} />
      </Stack>
    </Fragment>
  );
}
