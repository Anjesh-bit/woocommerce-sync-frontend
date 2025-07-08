import { Avatar, Text, Group, UnstyledButton } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { useCallback, useMemo } from "react";

import { ChevronDownSvg, ChevronUpSvg } from "../../../assets/static/icons";
import { ProductEntity } from "../../pages/product/product.types";

import { PaginatedDataTable } from ".";

type SortKey = "name" | "price";
type SortOrder = "asc" | "desc";

type ProductTableProps = {
  data: ProductEntity[];
  isLoading: boolean;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  onSortChange: (key: SortKey) => void;
  sortKey: SortKey;
  sortOrder: SortOrder;
  onFilterByProductId: (id: number) => void;
};

export function ProductTable({
  data,
  isLoading,
  page,
  total,
  onPageChange,
  onSortChange,
  sortKey,
  sortOrder,
  onFilterByProductId,
}: ProductTableProps) {
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

  const columns: DataTableColumn<ProductEntity>[] = useMemo(
    () => [
      {
        accessor: "image",
        title: "Image",
        render: (product) => {
          const initialImage = product.images?.find(() => true);
          return initialImage?.src ? (
            <Avatar src={initialImage.src} size="sm" radius="sm" />
          ) : (
            <Avatar color="gray" size="sm">
              ?
            </Avatar>
          );
        },
      },
      {
        accessor: "name",
        title: createSortHeader("Name", "name"),
      },
      {
        accessor: "sku",
        title: "SKU",
      },
      {
        accessor: "price",
        title: createSortHeader("Price", "price"),
        render: (p) => `$${p.price.toFixed(2)}`,
        textAlign: "right",
      },
      {
        accessor: "orderCount",
        title: "Orders",
        render: (product) => (
          <UnstyledButton onClick={() => onFilterByProductId(product.id)}>
            <Text size="sm" color="blue">
              {product.orderCount}
            </Text>
          </UnstyledButton>
        ),
        textAlign: "center",
      },
    ],
    [createSortHeader, onFilterByProductId]
  );

  return (
    <PaginatedDataTable<ProductEntity>
      dataSource={data}
      isLoading={isLoading}
      columnDefinitions={columns}
      currentPageIndex={page}
      onPageIndexChange={onPageChange}
      totalRecordCount={total}
      recordsPerPageLimit={20}
      emptyStateMessage="No products found"
    />
  );
}
