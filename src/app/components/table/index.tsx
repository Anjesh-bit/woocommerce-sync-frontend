import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useState, useCallback, useMemo } from "react";

import { PaginatedDataTableProps, TableRecord } from "./table.types";

export function PaginatedDataTable<TRecord extends TableRecord = TableRecord>({
  dataSource,
  columnDefinitions,
  recordsPerPageLimit = 10,
  initialPageIndex = 1,
  currentPageIndex,
  onRowClick,
  onPageIndexChange,
  totalRecordCount,
  tableBorderRadius,
  isLoading = false,
  emptyStateMessage = "No data available",
}: PaginatedDataTableProps<TRecord>) {
  const [internalPageIndex, setInternalPageIndex] = useState<number>(initialPageIndex);

  const isControlledPagination = currentPageIndex !== undefined;

  const resolvedPageIndex = useMemo(() => {
    return isControlledPagination ? currentPageIndex : internalPageIndex;
  }, [isControlledPagination, currentPageIndex, internalPageIndex]);

  const effectiveTotalRecordCount = useMemo(() => {
    return totalRecordCount ?? dataSource.length;
  }, [totalRecordCount, dataSource.length]);

  const handlePageIndexTransition = useCallback(
    (newPageIndex: number) => {
      if (isControlledPagination && onPageIndexChange) {
        onPageIndexChange(newPageIndex);
      } else {
        setInternalPageIndex(newPageIndex);
      }
    },
    [isControlledPagination, onPageIndexChange]
  );

  return (
    <Paper withBorder radius="md" p="md">
      <DataTable<TRecord>
        minHeight={250}
        records={dataSource}
        columns={columnDefinitions}
        totalRecords={effectiveTotalRecordCount}
        recordsPerPage={recordsPerPageLimit}
        onRowClick={onRowClick}
        page={resolvedPageIndex}
        onPageChange={handlePageIndexTransition}
        withTableBorder={false}
        borderRadius={tableBorderRadius}
        fetching={isLoading}
        noRecordsText={emptyStateMessage}
        striped={true}
        paginationActiveBackgroundColor="rgb(255, 215, 0)"
        highlightOnHover={true}
        styles={{
          header: {
            color: "rgb(255, 165, 0)",
            fontSize: "1rem",
          },
        }}
      />
    </Paper>
  );
}

PaginatedDataTable.displayName = "PaginatedDataTable";
