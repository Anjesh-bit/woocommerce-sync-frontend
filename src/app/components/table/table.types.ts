import { type DataTableColumn, type DataTableSortStatus } from "mantine-datatable";

export type TableRecord = Record<string, unknown>;

export interface PaginatedDataTableProps<TRecord extends TableRecord = TableRecord> {
  readonly dataSource: TRecord[];
  readonly columnDefinitions: DataTableColumn<TRecord>[];
  readonly recordsPerPageLimit?: number;
  readonly initialPageIndex?: number;
  readonly currentPageIndex?: number;
  readonly onPageIndexChange?: (pageIndex: number) => void;
  readonly totalRecordCount?: number;
  readonly sortConfiguration?: DataTableSortStatus<TRecord>;
  readonly onSortConfigurationChange?: (sortStatus: DataTableSortStatus<TRecord>) => void;
  readonly enableTableBorder?: boolean;
  readonly tableBorderRadius?: number;
  readonly isLoading?: boolean;
  readonly emptyStateMessage?: string;
  readonly onRowClick?: (params: { record: TRecord; index: number; event: React.MouseEvent }) => void;
}
