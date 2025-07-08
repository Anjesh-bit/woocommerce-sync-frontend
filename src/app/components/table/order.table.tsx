import { Badge, UnstyledButton, Group, Text } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import { useMemo, useCallback } from "react";

import { ChevronDownSvg, ChevronUpSvg } from "../../../assets/static/icons";
import { ORDER_STATUSES } from "../../pages/order/order.constant";
import { OrderEntity } from "../../pages/order/order.types";

import { PaginatedDataTable } from ".";

type SortKey = "date_created" | "total";
type SortOrder = "asc" | "desc";

type OrderTableProps = {
  data: OrderEntity[];
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  onRowClick?: (data: OrderEntity, index: number) => void;
  onSortChange: (key: SortKey) => void;
  isLoading: boolean;
  sortKey: SortKey;
  sortOrder: SortOrder;
};

export function OrderTable({
  data,
  page,
  total,
  onPageChange,
  onRowClick,
  isLoading,
  onSortChange,
  sortKey,
  sortOrder,
}: OrderTableProps) {
  const createSortHeader = useCallback(
    (label: string, key: SortKey) => (
      <UnstyledButton onClick={() => onSortChange(key)}>
        <Group gap={4}>
          <Text fw={700} size="md">
            {label}
          </Text>
          {sortKey === key && (sortOrder === "asc" ? <ChevronUpSvg /> : <ChevronDownSvg />)}
        </Group>
      </UnstyledButton>
    ),
    [sortKey, sortOrder, onSortChange]
  );

  const columns: DataTableColumn<OrderEntity>[] = useMemo(
    () => [
      {
        accessor: "id",
        title: "ID",
        width: 80,
      },
      {
        accessor: "number",
        title: "Order #",
        width: 120,
      },
      {
        accessor: "billing.first_name",
        title: "Customer",
        render: (order: OrderEntity) => {
          const fullName = `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.trim();
          return fullName || "N/A";
        },
        width: 200,
      },
      {
        accessor: "total",
        title: createSortHeader("Total", "total"),
        render: (order: OrderEntity) => `$${Number(order.total).toFixed(2)}`,
        width: 100,
        textAlign: "right",
      },
      {
        accessor: "status",
        title: "Status",
        render: (order: OrderEntity) => {
          const statusConfig = ORDER_STATUSES[order.status];
          return (
            <Badge color={statusConfig?.color || "gray"} radius="sm" variant="light" size="sm">
              {statusConfig?.label || order.status}
            </Badge>
          );
        },
        width: 120,
      },
      {
        accessor: "date_created",
        title: createSortHeader("Created", "date_created"),
        render: (order: OrderEntity) => {
          try {
            return new Date(order.date_created).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            });
          } catch (error) {
            return "Invalid date";
          }
        },
        width: 180,
      },
    ],
    [createSortHeader]
  );

  const handleRowClick = useCallback(
    ({ record, index }: { record: OrderEntity; index: number; event: React.MouseEvent }) => {
      onRowClick?.(record, index);
    },
    [onRowClick]
  );

  return (
    <PaginatedDataTable<OrderEntity>
      dataSource={data ?? []}
      columnDefinitions={columns}
      currentPageIndex={page}
      onPageIndexChange={onPageChange}
      totalRecordCount={total}
      isLoading={isLoading}
      recordsPerPageLimit={20}
      emptyStateMessage="No orders found"
      onRowClick={handleRowClick}
      enableTableBorder
      tableBorderRadius={8}
    />
  );
}
