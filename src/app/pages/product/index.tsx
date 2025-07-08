import { Stack, TextInput, Title, Group, Box, ThemeIcon } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./product.module.css";
import { useProducts } from "./use-product.services";
import { ProductSvg, SearchSvg } from "../../../assets/static/icons";
import { ProductTable } from "../../components/table/product.table";

export default function Product() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 400);
  const navigate = useNavigate();
  const [sort, setSort] = useState<"name" | "price">("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useProducts({
    search: debouncedSearch,
    sort,
    order,
    page,
    limit: 20,
  });

  const handleSort = (column: "name" | "price") => {
    if (sort === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(column);
      setOrder("asc");
    }
  };

  return (
    <Stack p="md">
      <Box className={styles["product-title"]}>
        <Title order={2}>Products</Title>
        <ThemeIcon size="lg" radius="md" variant="gradient" gradient={{ from: "#FFD700", to: "#FFA500", deg: 45 }}>
          <ProductSvg />
        </ThemeIcon>
      </Box>
      <Group grow>
        <TextInput
          placeholder="Search by name or SKU"
          leftSection={<SearchSvg />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          styles={{
            input: {
              border: "2px solid rgb(255, 165, 0)",
            },
          }}
        />
      </Group>

      <ProductTable
        data={data?.data || []}
        isLoading={isLoading}
        page={page}
        total={data?.pagination.total || 0}
        onPageChange={setPage}
        onSortChange={handleSort}
        sortKey={sort}
        sortOrder={order}
        onFilterByProductId={(id) => {
          navigate(`/orders?productId=${id}`);
        }}
      />
    </Stack>
  );
}
